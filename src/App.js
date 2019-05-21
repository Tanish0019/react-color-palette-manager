import React from 'react';
import Palette from './components/Palette';
import { generatePalette } from './utils/colorHelper';
import defaultPalettes from './defaultPalettes';
import './styles/styles.scss';

function App() {
  console.log(generatePalette(defaultPalettes[0]));
  return (
    <div className="App">
      <Palette {...defaultPalettes[0]}/>
    </div>
  );
}

export default App;
