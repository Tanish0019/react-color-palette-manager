import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import { generatePalette } from './utils/colorHelper';
import defaultPalettes from './defaultPalettes';
import './styles/styles.scss';

function App() {
  console.log(generatePalette(defaultPalettes[0]));
  return (
    <Switch>
      <Route 
        exact 
        path="/" 
        render={() => <PaletteList palettes={defaultPalettes}/>}
      />
      <Route 
        exact 
        path="/palette/:id" 
        render={(routeProps) => 
          <Palette 
            palette={
              generatePalette(
                findPalette(routeProps.match.params.id)
              )
            }/>
          }/>
    </Switch>
  );
}

function findPalette(id) {
  return defaultPalettes.find((palette) => {
    return palette.id === id;
  })
}

export default App;
