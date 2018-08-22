import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'rxjs';
import App from './App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const Index = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}


ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
