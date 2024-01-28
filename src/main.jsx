import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// adjust root id according to your component
ReactDOM.createRoot(document.getElementById('rc_drag_upload_comp')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
