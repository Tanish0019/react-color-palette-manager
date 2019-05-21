import React from 'react';
import defaultPalettes from './defaultPalettes';
import './styles/styles.scss';
import Palette from './components/Palette';

function App() {
  return (
    <div className="App">
      <Palette {...defaultPalettes[0]}/>
    </div>
  );
}

export default App;
