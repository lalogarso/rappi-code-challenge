import React, { Component } from 'react';
import NavBar from './components/NavBar'
import axios from 'axios';
import MenuLalo from './components/Menu.js'
import Contenedor from './components/Contenedor.js'
import Producto from './components/Producto.js'
import Filtro from './components/Filtro.js'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class App extends Component {

  state = {
    sublevels: null
  };

  productsAPI = null;

  //Se cargan todos los datos de inicio
  componentWillMount() {
      axios.get("/api/categories")
          .then(response => {
            const menu = (
              <NavBar categories={response.data} funcSubLevels={this.setSublevels} setProductos={this.setProductos} />
            )
            this.setState({
              menu: menu,
              categories: response.data
            })
          })

      axios.get("/api/products")
              .then(response => {
                this.setState({
                  productsAPI: response.data
                })
                this.productsAPI = response.data;
              })

      axios.get("/api/shoppingCar")
              .then(response => {
                this.setState({
                  carritoAPI: response.data
                })
                this.actualizarListaCarrito()
              })
  }

  //Cuando se añade o quita un elemento del carrito, se actualiza la lista
  actualizarListaCarrito () {
    var listaCarrito = [];
    axios.get("/api/shoppingCar")
        .then(response => {
          this.setState({
            carritoAPI: response.data
          })
          this.productsAPI.forEach((producto) => {
            response.data.data.forEach((carrito) => {
              if (producto.id === carrito.id) {
                listaCarrito.push(producto);
              }
            })
          });
          const listaCar = (
            <div>
              <Typography color="textSecondary">
                <h2>Carrito</h2>
              </Typography>
              {listaCarrito.map((product, index) => {
                return <Producto key={index} name={product.name} product={product} precio={product.price} borrar={true} addOrDelete={this.deleteProductToCart} />
              })}
            </div>
          )
          this.setState({carrito: listaCar})
        })

  }

  //Añade un producto al carrito
  addProductToCart = (product) => {
    axios.post("/api/shoppingCar", { id: product.id })
      .then(res => {
        this.actualizarListaCarrito();
      })
  }

  //Borra un elememnto del carrito
  deleteProductToCart = (product) => {
    axios.delete("/api/shoppingCar/" + product.id + "/all")
      .then(res => {
        this.actualizarListaCarrito();
      })
  }

  //Se aplica filtro sobre la lita de productos
  handleChangeFilter = (e, params) => {
    const productosAply = this.state.productsSublevel.filter((value) => {
      return value.name.indexOf(params) !== -1;
    });
    const productos = (
      <div>
        <Typography color="textSecondary">
          <h2>Lista de productos</h2>
        </Typography>
        <Filtro handleChangeFilter={this.handleChangeFilter} /><br/>
        {productosAply.map((valor, index) => {
          return <Producto key={index} name={valor.name} product={valor} precio={valor.price} isDisp={valor.available} addOrDelete={this.addProductToCart}/>
        })}
      </div>
    )
    this.setState({
      productos: productos
    })
  }

  //Se muestra la lista de acuerdo al subnivel elegido
  setProductos = (e, levels) => {
    const productosAply = this.state.productsAPI.filter((value) => {
      return value.sublevel_id === levels.id;
    })
    this.setState({
      productsSublevel: productosAply
    })
    const productos = (
      <div>
        <Typography color="textSecondary">
          <h2>Lista de productos</h2>
        </Typography>
        <Filtro handleChangeFilter={this.handleChangeFilter} /><br/>
        {productosAply.map((valor, index) => {
          return <Producto key={index} name={valor.name} product={valor} precio={valor.price} isDisp={valor.available} addOrDelete={this.addProductToCart}/>
        })}
      </div>
    )
    this.setState({
      productos: productos
    })
  }

  //Se muestra la barra de subniveles
  setSublevels = (e, levels) => {
    const sublevelsMenu = (
      <div>
          <MenuLalo categories={levels.sublevels} setProductos={this.setProductos}/>
      </div>
    );
    this.setState({
      sublevels: sublevelsMenu
    })
  }

  render() {
    return (
      <div>
        {this.state.menu}
        <br/>
          <Contenedor contenido={this.state.sublevels} />
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Contenedor contenido={this.state.productos} />
            </Grid>
            <Grid item xs={6}>
              <Contenedor contenido={this.state.carrito} />
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default App;
