import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'

import {Provider} from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    {/*
    react-redux 사용 안했을 때
    Context 로 연결
    import ReduxContext from './contexts/ReduxContext';
    
    <ReduxContext.Provider value={store}>
      <App/>
    </ReduxContext.Provider>
    */}

    {/*react-redux 사용 했을 때 */}
    <Provider store={store}>
      <App/>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
