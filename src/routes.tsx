import React from 'react';
/* frequentemente ao utilizar Typescript pode ser que a definição de tipos não seja
incluída na instalção da biblioteca, portanto pode ser necessário instalá-la separada do pacote,
exemplo: o react-router-dom necessita do npm install @types/react-router-dom -D 
lembrar que o -D deve ser utilizado para não incluir a definição de tipo no projeto em produção */
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import FichaInspecao from './pages/FichaInspecao';



const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} exact path="/"  />
            <Route component={FichaInspecao} exact path="/ficha-inspecao"  />
        </BrowserRouter>
    );
}
export default Routes;