import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelloWorldGenerator from './HelloWorldGenerator';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<HelloWorldGenerator />, document.getElementById('root'));

serviceWorker.unregister();