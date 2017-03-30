
import "babel-polyfill";

import React from 'react';
import { render } from 'react-dom';

import Application from './containers/Application';

render(
    <Application / >,
    document.getElementById('root')
);
