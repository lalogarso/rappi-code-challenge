import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCart from '@material-ui/icons/RemoveShoppingCart';

class Producto extends React.Component {

  //Dispara el evento de añadir o borrar del padre
  handleOnClick = (e) => {
    this.props.addOrDelete(this.props.product);
  }

  //Determina si se añade el boton de añadir o borrar
  setButton = () => {
    if (this.props.isDisp === undefined) {
      return <Button size="small" onClick={this.handleOnClick}><RemoveShoppingCart /></Button>
    } else {
      return (this.props.isDisp ?
        <Button size="small" onClick={this.handleOnClick}><AddShoppingCart /></Button>
         :
         <Button size="small" disabled><AddShoppingCart /></Button>
       )
    }
  }

  render () {
    return (
      <Card >
      <CardContent>
        <Typography color="textSecondary">
          {this.props.precio}
        </Typography>
        <Typography variant="headline" component="h2">
          {this.props.name}
        </Typography>
        <Typography component="p">
          Disponible: {this.props.isDisp ? "Si" : "No"}
        </Typography>
      </CardContent>
      <CardActions>
        {this.setButton()}
      </CardActions>
    </Card>
    );
  }
}

export default Producto;
