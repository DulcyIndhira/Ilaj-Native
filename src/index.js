import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  LoginScreen,
  ForgotPasswordScreen,
  Dashboard,
  Decline,
  
} from './Screens';
import FeedbackForm from './Screens/FeedbackForm'
const Router =createStackNavigator(
  {
      Decline: {
      screen: Decline,
      navigationOptions: {
        title: 'DECLINE ORDER',
        headerStyle: { borderBottomWidth: 0,elevation: 0,shadowOpacity: 0 ,backgroundColor:'#f8f8f8'},
        headerTintColor: '#ff453a',headerTitleStyle:{fontSize:12,marginLeft:36, marginLeft:170,fontWeight:"bold",color:'black'}
      },
    },
    
    Dashboard:{
      screen: Dashboard,
      navigationOptions: {
        headerShown:false,
        title: 'Dashboard',
        headerStyle: {  backgroundColor: '#f6f6f6' },
        headerTintColor: '#262626',headerTitleStyle:{fontSize:12,marginLeft:36, marginLeft:170,fontWeight:"bold"}
      },
    },
   
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,

      },
    },
    
    FeedbackForm: {
      screen: FeedbackForm,
      navigationOptions: {
        headerShown: false,

      },
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        headerShown: false,

      },
    },
    
  },
  {
    initialRouteName: 'LoginScreen',
    
  }
);

export default createAppContainer(Router);