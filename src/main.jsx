import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
// import {myContext } from './components/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <myContext.Provider value={}>

    </myContext.Provider> */}
    <App />
  </React.StrictMode>,
)
