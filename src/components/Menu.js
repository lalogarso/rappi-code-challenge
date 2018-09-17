import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/MenuCss.js'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MenuLalo extends React.Component {
  state = {
    value: 0,
    sublevels: null
  };

  handleChange = (event, value) => {
    this.setState({ value });
    if (this.props.funcSubLevels !== undefined ) this.props.funcSubLevels(event, this.props.categories[value]);
    if (this.props.setProductos !== undefined ) this.props.setProductos(event, this.props.categories[value]);
  };

  setSublevels = (evente, sublevels) => {
    this.setState({
      value: this.state.value,
      sublevels: sublevels
    });
  }

  render() {
    const { value } = this.state;

    return (
        <Tabs value={value} onChange={this.handleChange} color="secondary">
         {this.props.categories.map(categorie => {
           return <Tab label={categorie.name} key={categorie.id} />
         })}
        </Tabs>
    );
  }
}

MenuLalo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuLalo);
