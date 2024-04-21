import { useState } from 'react';
import './App.css';
import Counter from './components/counter';
import ErrorBoundary from './components/error-boundry';

function App() {
  const [number, setNumber] = useState(0);


  

  return (
    <div className="container">
    <ErrorBoundary>
    <Counter/>
    </ErrorBoundary>
      <div className="number">{number}</div>
      <button className="button" onClick={() => setNumber(prev => prev + 1)}>
        Number +
      </button>
    </div>
  );
}

export default App;
