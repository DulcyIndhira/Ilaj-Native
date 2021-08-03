import React from 'react';
import { Text, View, StyleSheet, Image, AsyncStorage, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import Toast from 'react-native-simple-toast';
// const fetchFonts = () => {
//     return Font.loadAsync({
//         'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//     });
// };
export default class FooterView extends React.Component {
    constructor() {
        super();
        this.state = {
            dataloading: false,
            myservice: '',
            feedback: false,
            Logout: false
        }
    }
    componentDidMount() {
     
        this.setState({ myservice: 'service2' })
        // if (!this.state.dataloading) {
        //     return (
        //         <AppLoading
        //             startAsync={fetchFonts}
        //             onFinish={() => this.setState({ dataloading: true })} />
        //     );
        // }
    }
    onfeedbackclick = () => {
        this.setState({ myservice: 'myservice' })
        this.props.navigation.navigate('FeedbackForm', {
            id: this.props.id,
            userName: this.props.userName,
            userId:this.props.userTypeId
        })
    }
    onmyserviceclick = () => {
        this.props.navigation.navigate('Dashboard')
    }
    Logout = () => {
        AsyncStorage.setItem('UserId', '')
        AsyncStorage.setItem('UserName', '')
        AsyncStorage.setItem('UserTypeId', '')
        AsyncStorage.clear()
        AsyncStorage.removeItem('UserId')
        AsyncStorage.removeItem('UserName')
        AsyncStorage.removeItem('UserTypeId')
        // await  BackHandler.exitApp();
        Toast.show('Logged out sucessfully')
        this.props.navigation.navigate('LoginScreen', {
            login: true,
        })
        // await  BackHandler.exitApp();
    }
    render() {
        return (
            <View style={styles.footeralign}>
                <View>
                    <View>{
                        this.props.myservice === 'service2' &&
                        <TouchableOpacity>
                            <View style={{ weight: '100%', alignContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 16, width: 19 }}
                                    source={require('../assets/Service.png')}
                                />
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontSize: 10, fontFamily: 'cerapro-med' }}>My Services</Text>
                            </View>
                        </TouchableOpacity>}
                        {
                            this.props.myservice === 'myservice' && <TouchableOpacity onPress={this.onmyserviceclick}>
                                <View style={{ weight: '100%', alignContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 16, width: 19 }}
                                        source={require('../assets/Myservice2.png')}
                                    />
                                </View>
                                <View style={{ marginTop: 12 }}>
                                    <Text style={{ fontSize: 10, color: '#c3c3c3', fontFamily: 'cerapro-med' }}>My Services</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View>
                    {this.props.feedback === 'feedbackform' && <TouchableOpacity >
                        <View style={{ weight: '100%', alignContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ height: 19, width: 19 }}
                                source={require('../assets/MyFeedback2.png')}
                            />
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 10, fontFamily: 'cerapro-med' }}>Feedback</Text>
                        </View>
                    </TouchableOpacity>}
                    {
                        this.props.feedback === 'feedbackformdashboard' && <TouchableOpacity onPress={this.onfeedbackclick} >
                            <View style={{ weight: '100%', alignContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{ height: 19, width: 19 }}
                                    source={require('../assets/Feedback.png')}
                                />
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={{ fontSize: 10, fontFamily: 'cerapro-med', color: '#c3c3c3' }}>Feedback</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    <TouchableOpacity onPress={this.Logout}>
                        <View style={{ weight: '100%', alignContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{ height: 19, width: 19 }}
                                source={require('../assets/Logout.png')}
                            />
                        </View>
                        <View style={{ padding: 12 }}>
                            <Text style={{ fontSize: 10, fontFamily: 'cerapro-med', color: '#c3c3c3' }}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footeralign: {
        alignSelf: "center",
        flexDirection: "row", width: "93%",
        justifyContent: "space-evenly", padding: 15, backgroundColor: "white",
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,

    }
})