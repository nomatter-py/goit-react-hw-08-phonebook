import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import debounce from 'lodash.debounce';
import { saveState } from "./services/bowser-storage";

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
