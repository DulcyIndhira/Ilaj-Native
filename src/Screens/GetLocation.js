import React from 'react';
import { View, PermissionsAndroid, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default class GetLocation extends React.Component {

    constructor(){
        super();
        this.state = {
            currentLongitude: 'unknown',
            currentLatitude: 'unknown',
        }
    }
 
    componentDidMount = () => {
        var that = this;
        async function requestLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    that.callLocation(that);
                } else {
                    alert("Permission Denied");
                }
            } catch (err) {
                alert("err", err);
                console.warn(err)
            }
        }
        requestLocationPermission();
    }
    callLocation(that) {
        setInterval(() => {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position)
                    const currentLongitude = JSON.stringify(position.coords.longitude);
                    const currentLatitude = JSON.stringify(position.coords.latitude);
                    that.setState({ currentLongitude: currentLongitude });
                    that.setState({ currentLatitude: currentLatitude });
                    alert("normal " + currentLatitude + currentLongitude)

                },
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        }, 60000);
        that.watchID = Geolocation.watchPosition((position) => {
            console.log("Move", position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);
            that.setState({ currentLongitude: currentLongitude });
            that.setState({ currentLatitude: currentLatitude });
            alert("normal " + currentLatitude + currentLongitude)
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>Latitude:{this.state.currentLatitude}</Text>
                <Text>Longitude:{this.state.currentLongitude}</Text>
            </View>
        )
    }
}
