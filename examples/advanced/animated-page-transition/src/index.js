import 'modern-normalize/modern-normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { FocusRoot } from '@mubi/lrud';
import './index.css';
import App from './app';

ReactDOM.render(
  <FocusRoot>
    <App />
  </FocusRoot>,
  document.getElementById('root')
);
