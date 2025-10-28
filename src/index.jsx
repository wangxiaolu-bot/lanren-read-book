import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b82f6',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorError: '#ef4444',
          fontFamily: 'Inter, Roboto, sans-serif'
        },
        components: {
          Button: {
            colorPrimary: '#3b82f6',
            colorPrimaryHover: '#2563eb',
            colorPrimaryActive: '#1d4ed8'
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
