
import React from 'react';
import {theme} from './src/Core/theme'
import App from './src'
import {Provider} from 'react-native-paper'
export default class Main extends React.Component() {
  render(){
  return (
    <Provider theme={theme}>
     <App/>
    </Provider>
  );
}}

import React from 'react';
import {theme} from './src/Core/theme'
import App from './src'
import {Provider} from 'react-native-paper'
export default class Main extends React.Component() {
  render(){
  return (
    <Provider theme={theme}>
     <App/>
    </Provider>
  );
}}
