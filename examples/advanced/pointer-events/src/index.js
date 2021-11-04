import 'modern-normalize/modern-normalize.css';
import ReactDOM from 'react-dom';
import { FocusRoot } from '@mubi/lrud';
import './index.css';
import App from './app';

ReactDOM.render(
  <FocusRoot pointerEvents>
    <App />
  </FocusRoot>,
  document.getElementById('root')
);
