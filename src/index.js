import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
