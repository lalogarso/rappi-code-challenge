import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import MenuLalo from './Menu.js'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/MenuCss.js'
import PropTypes from 'prop-types';

class NavBar extends Component {

  state = {
    categories: null,
    value: 0
  }

  setTabs = (e, params) => {
    this.setState({
      value: params
    });
  }

  render () {
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="title" color="inherit" noWrap>
              El Baratón
            </Typography>
            <MenuLalo categories={this.props.categories} funcSubLevels={this.props.funcSubLevels}/>
            </Toolbar>
          </AppBar>
        </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
