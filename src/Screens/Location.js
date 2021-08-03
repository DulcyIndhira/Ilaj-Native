import React from 'react';
//import react in our code. 
import {View, Text,  StyleSheet, Image ,PermissionsAndroid,Platform} from 'react-native';
//import all the components we are going to use.
import SwitchSelector from "react-native-switch-selector";
import Geolocation from '@react-native-community/geolocation';


export default class UserLocation extends React.Component {
  constructor(){
    super();
    this.state = {
      currentLongitude: 'unknown',//Initial Longitude
      currentLatitude: 'unknown',//Initial Latitude
      selectedvalue:''
   }
  }
 
 componentDidMount = () => {
   this.setState({selectedvalue:'A'})
  var that =this;
  //Checking for the permission just after component loaded
  if(Platform.OS === 'ios'){
    this.callLocation(that);
  }else{
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
        
          that.callLocation(that);
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        console.warn(err)
      }
    }
    requestLocationPermission();
  }    
 }
 callLocation(that){
  //alert("callLocation Called");
    Geolocation.getCurrentPosition(
      //Will give you the current location
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          //getting the Longitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          //getting the Latitude from the location json
          that.setState({ currentLongitude:currentLongitude });
          //Setting state Longitude to re re-render the Longitude Text
          that.setState({ currentLatitude:currentLatitude });
          //Setting state Latitude to re re-render the Longitude Text
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeInterval: 5000}
    );
    that.watchID = Geolocation.watchPosition((position) => {
      //Will give you the location on location change
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
       that.setState({ currentLongitude:currentLongitude });
       //Setting state Longitude to re re-render the Longitude Text
       that.setState({ currentLatitude:currentLatitude });
       //Setting state Latitude to re re-render the Longitude Text
    });
    if(this.state.selectedvalue==='A'){
      fetch('http://webapi.ilajservices.com/api/Technician/LocationTracker', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devId:"asdsadsdasdsdsdsad",
          userId:this.props.userId ,
          latValue: this.state.currentLatitude,
          longValue: this.state.currentLongitude
        })
      })
      .then(response => response.json())
              .then((responseJson) => {
                if(responseJson.success==='true') {
                    console.log('response',responseJson)
                }
              })
              .catch((error) => {console.log(error)
               }
                  ) 
              }
              else{
                console.log('Not Available')
              }

 }
 onPressswitch=async(value)=>{
  this.setState({selectedvalue:value})
}
 componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
 }
 render() {
    return (
      
         <SwitchSelector
                  initial={0}
                  onPress={(value)=>this.onPressswitch(value)}
                  textColor={'#434343'} //'#7a44cf'
                  selectedColor={'#ffffff'}
                  buttonColor={'#ff453a'}
                  borderColor={'#f8f8f8'}
                  backgroundColor={'#e5e5e5'}
                  fontSize={8}
                  height={30}
                  value={this.state.selectedvalue}
                  borderRadius={10}
                  style={{width:130,height:25,fontSize:10,marginLeft:180,color:'#e5e5e5',bottom:35}}
                  hasPadding
                  options={[
                    { label: "Available", value: "A" }, //images.feminino = require('./path_to/assets/img/feminino.png')
                    { label: "Not Available", value: "N" } //images.masculino = require('./path_to/assets/img/masculino.png')
                  ]}
             />
      
    )
 }
}
const styles = StyleSheet.create ({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    padding:16,
    backgroundColor:'white'
 },
 boldText: {
    fontSize: 30,
    color: 'red',
 }
})