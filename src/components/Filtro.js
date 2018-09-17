import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class Filtro extends React.Component {

  state = {
    filtro: ""
  }

  handleChange = (e, params) => {
    console.log("Campo", e.event);
    this.setState({filtro: e.target.value})
    this.props.handleChangeFilter(e, e.target.value);
  }

  render () {
    return (
      <FormControl>
        <InputLabel htmlFor="name-simple">Filtrar por nombre</InputLabel>
        <Input id="name-simple" value={this.state.filtro} onChange={(e, params) => {this.handleChange(e, params)}} />
      </FormControl>
    );
  }
}

export default Filtro;
