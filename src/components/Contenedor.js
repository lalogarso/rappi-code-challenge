import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Contenedor extends Component {
  render () {
    return (
      <Grid container spacing={24}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={10}>
          {this.props.contenido}
        </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid>)
  }
}

export default Contenedor;
