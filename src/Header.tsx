import React from 'react';

/* 
    Ao trabalhar com TS transformar os componentes em Constantes para que recebam propriedaes
    Transformá-lo em arrow functions, assim é mais fácil passar propriedades para os componentes.
    React.FC é um generic (um tipo do TS que recebe um parâmetro).
*/

/* Em TS define um tipo */
interface HeaderProps{
    title: string
    subtitle?: string; // ? torna opcional
}//END Header Props

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>Plataforma de Fichas da Confiabilidade EFC</h1>
            <h2>{props.title}</h2>
        </header>
    )
}

export default Header;