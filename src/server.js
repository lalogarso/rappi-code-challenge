/*
@autor: Eduardo García Solis
@date: 13 - 09 - 2018
@desc: API para tiendas El Baraton
*/

//IMPORTS
var express = require('express')
var fs = require('fs');
var bodyParser = require("body-parser");
var app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Lista de productos y categorias
let categories = require ('./data/categories.json');
let products = require ('./data/products.json');

//Servicio que obtiene las categorias de los productos
app.get('/api/categories', function (req, res) {
  res.send(categories.categories);
})

//Servicio que obtiene los productos disponibles en almacen
app.get('/api/products', function (req, res) {
  res.send(products.products);
})

//SERVICIOS PARA GESTION DEL CARRITO
//Obtenemos la lista de productos dentro del carrito
app.get('/api/shoppingCar', function (req, res) {
  res.send({ data: readShoppingCar() });
})

//Agregamos un elemento al carrito de compras
app.post('/api/shoppingCar', function (req, res) {
  var shoppingCar = readShoppingCar();
  var isNew = true;
  shoppingCar.forEach((valor) => {
    if (req.body.id === valor.id) {
        isNew = false;
        valor.unidades++;
    }
  });
  if (isNew) {
    shoppingCar.push({id: req.body.id, unidades: 1});
  }
  writeShoppingCar(shoppingCar);
  res.send( true );
})

//Borra un producto y todos sus iguales dentro del carrito
app.delete('/api/shoppingCar/:idProduct/all', function (req, res) {
  var shoppingCar = readShoppingCar();
  var newShoppingCar = shoppingCar.filter( (valor, index, array) => {
    return valor.id !== req.params.idProduct;
  });
  writeShoppingCar(newShoppingCar);
  res.send( true );
})

//Servicio que reduce en uno la cantidad de un producto puesto en el carrito
app.delete('/api/shoppingCar/:idProduct/one', function (req, res) {
  var shoppingCar = readShoppingCar();
  var newShoppingCar = shoppingCar.filter( (valor, index, array) => {
    if (req.params.idProduct === valor.id) {
        valor.unidades--;
    }
    return valor.unidades !== 0;
  });
  writeShoppingCar(newShoppingCar);
  res.send( true );
})

//*********FUNCIONES LOGICAS PARA GESTION DEL CARRITO*********//
//Recupera la información de carrito y la regresa como JSON
function readShoppingCar () {
  return JSON.parse(fs.readFileSync('./data/shoppingCar.json'));
}

//Escribe un objeto JSON sobre el carrito
function writeShoppingCar (obj) {
  console.log(obj);
  let data = JSON.stringify(obj, null, 2);
  fs.writeFile('./data/shoppingCar.json', data, (err) => {
    if (err) throw err;
  });
}

app.listen(process.env.PORT || 8080);
