import React, { useState } from 'react';
import './App.css';
import { createPortal } from 'react-dom';
import Alert from './components/alert';

function App() {
  const [show, setShow] = useState(false);

  const handleAlert = () => {
    setShow(true);
  };

  
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className="container">
      <div className="other-components">
        <h1>Other Components</h1>
        <button onClick={handleAlert}>Alert</button>
      <Alert  show={show} children onClose={handleClose}>
      Successfully login
      </Alert>
      </div>
    </div>
  );
}



export default App;
