import css from './app.scss';
import React from 'react';
import ReactDom from 'react-dom';
import Root from './Root';

console.log("Hello World");

ReactDom.render(
    <Root></Root>,
    document.getElementById('root')
);