// import React from 'react';
// import {createAppContainer} from 'react-navigation';
// import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
// import {createStackNavigator} from 'react-navigation-stack';
// import FirstPage from './FirstPage';
// import SecondPage from './SecondPage';
// const TabScreen = createMaterialTopTabNavigator(
//   {
//     Home: { screen: FirstPage },
//     Settings: { screen: SecondPage },
//   },
//   {
//     tabBarPosition: 'top',
//     swipeEnabled: true,
//     animationEnabled: true,
//     tabBarOptions: {
//       activeTintColor: '#FFFFFF',
//       inactiveTintColor: '#F8F8F8',
//       style: {
//         backgroundColor: '#633689',
//       },
//       labelStyle: {
//         textAlign: 'center',
//       },
//       indicatorStyle: {
//         borderBottomColor: '#87B56A',
//         borderBottomWidth: 2,
//       },
//     },
//   }
// );

// const AppView = createStackNavigator({
//   TabScreen: {
//     screen: TabScreen,
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#633689',
//       },
//       headerTintColor: '#FFFFFF',
//       title: 'TabExample',
//     },
//   },
// });
// export default createAppContainer(AppView);