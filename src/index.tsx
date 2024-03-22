import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createState } from './models';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const initialState = createState();
root.render(
  <React.StrictMode>
    <App initialState={initialState}/>
  </React.StrictMode>
);
