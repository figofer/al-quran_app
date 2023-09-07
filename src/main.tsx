import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import surahReducer from './redux/store.ts';

const store = configureStore({
  reducer: {
    surah: surahReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <Provider store={store}>
      <div className='bg-primary h-screen w-full -z-40 fixed top-0 '>
      </div>
      <App />
    </Provider>
  </React.StrictMode>,
)
