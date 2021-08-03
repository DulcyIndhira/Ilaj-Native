// import React from 'react';
// import { AsyncStorage } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import * as Permissions from 'react-native-permissions';
// import * as TaskManager from "react-native-background-task";

// import SwitchSelector from "react-native-switch-selector";
// const LOCATION_TASK_NAME = "background-location-task";
// let Selected = 'A'
// export default class UserLocation extends React.Component {
//     state = {
//         currentLongitude: '',
//         currentLatitude: '',
//         geocode: '',
//         selectedvalue: '',
//         region: null,
//         error: ''
//     }
//     async componentDidMount() {
//         this.setState({ selectedvalue: 'A' })
//         const { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status === "granted") {
//             this._getLocationAsync();
//         } else {
//             this.setState({ error: "Location service access needed" });
//         }
//     }
//     onPressswitch = async (value) => {
//         Selected = value
//         this.setState({ selectedvalue: value })
//     }
//     _getLocationAsync = async () => {
//         await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//             accuracy: Location.Accuracy.Balanced,
//             timeInterval: 5000,
//         });

//     };

//     render() {
//         return (
//             <SwitchSelector
//                 initial={0}
//                 onPress={(value) => this.onPressswitch(value)}
//                 textColor={'#434343'} //'#7a44cf'
//                 selectedColor={'#ffffff'}
//                 buttonColor={'#ff453a'}
//                 borderColor={'#f8f8f8'}
//                 backgroundColor={'#e5e5e5'}
//                 fontSize={8}
//                 height={30}
//                 value={this.state.selectedvalue}
//                 borderRadius={10}
//                 style={{ width: 130, height: 25, fontSize: 10, marginLeft: 180, color: '#e5e5e5', bottom: 35 }}
//                 hasPadding
//                 options={[
//                     { label: "Available", value: "A" }, //images.feminino = require('./path_to/assets/img/feminino.png')
//                     { label: "Not Available", value: "N" } //images.masculino = require('./path_to/assets/img/masculino.png')
//                 ]}
//             />
//         )
//     }
// }
// TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//     if (error) {
//         return;
//     }
//     if (data) {
//         const { locations } = data;
//         let lat = locations[0].coords.latitude;
//         let long = locations[0].coords.longitude;
//         userId = (await AsyncStorage.getItem("UserTypeId")) || "none";
//         if (Selected === 'A') {
//             fetch('http://webapi.ilajservices.com/api/Technician/LocationTracker', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     devId: "asdsadsdasdsdsdsad",
//                     userId: userId,
//                     latValue: lat,
//                     longValue: long
//                 })
//             })
//                 .then(response => response.json())
//                 .then((responseJson) => {
//                     if (responseJson.success === 'true') {
//                         console.log('response', responseJson)
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error)
//                 }
//                 )
//         }
//         else {
//             console.log('Not Available')
//         }
//     }

// });
