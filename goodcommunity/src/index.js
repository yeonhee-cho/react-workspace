import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PracticeApp from "./PracticeApp";
import Main from "./Main";
import Main_Theme from "./Main_Theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {/* <App />*/}
      {/*<PracticeApp />*/}
      {/*<Main/>*/}
      <Main_Theme/>
  </React.StrictMode>
);
