import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CssBaseline><App /></CssBaseline>, document.getElementById('root'));
registerServiceWorker();
