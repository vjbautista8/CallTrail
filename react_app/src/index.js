import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
window.ZOHO.embeddedApp.on('PageLoad', function (data) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  // MAX VALUE {height: 700, width: 1350}
  const resize = window.ZOHO.CRM.UI.Resize({ height: 700, width: 1350 });
  // console.log('WIDGET META DATA', data);
  root.render(
    <Provider store={store}>
      <App tab='home' data={data} />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        rtl={false}
        hideProgressBar
        newestOnTop={true}
      />
    </Provider>
  );
});
window.ZOHO.embeddedApp.init();
