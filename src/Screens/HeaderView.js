import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
//import * as Font from 'expo-font';
import UserLocation from './Location';
// import { AppLoading } from 'expo';
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'cerapro-bold': require('../../assets/fonts/CeraPro-Bold.ttf'),
//     'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   });
//   };
export default class HeaderView extends React.Component{
    constructor(){
        super();
        this.state={
            dataloading:false
        }
    }
      componentDidMount(){
      // if(!this.state.dataloading){
      //     return(
      //       <AppLoading
      //       startAsync={fetchFonts}
      //       onFinish={()=>this.setState({dataloading:true})}/>
      //     );
      //   }
     }
    render(){
        return(
            <View style={{backgroundColor:"#f8f8f8", marginTop:30, paddingLeft:30, paddingRight:30}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",padding:5}}>
                <View >
                  <Text style={styles.welcometext}>Welcome</Text>
                  <Text style={styles.orderid}>{this.props.userName}</Text>
                </View>
                <View>
                  <Text style={styles.Techtext}>Technician ID</Text>
                  <Text style={styles.Technicianid}>{this.props.id}</Text>
                </View>
            </View>
            {this.props.pageTitle==='MY SERVICES'&&<>
            <View style={{paddingTop:40}}></View>
<View style={{flex:1}}>
            <Text style={styles.heading}>{this.props.pageTitle}</Text>
            <UserLocation userId={this.props.userId}></UserLocation>

            </View></>}
{this.props.pageTitle==='FEEDBACK'&&
<>
            <View style={{paddingTop:20}}></View>
            <Text style={styles.headingfeedback}>{this.props.pageTitle}</Text>
            </>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
  heading:{
    fontSize:12,
    fontFamily:'cerapro-bold',
    letterSpacing:1.08,
    textAlign:"center",
    color:"#000000",
    fontWeight:'normal',
    marginRight:190,
    bottom:10
  },
  headingfeedback:{
    fontSize:12,
    fontFamily:'cerapro-bold',
    letterSpacing:1.08,
    textAlign:"center",
    color:"#000000",
    fontWeight:'normal',
     },
  orderid:{
      fontSize:14,
      color:"#000000",
      fontFamily:'cerapro-med',
      padding:5
  },
  welcometext:{
      fontSize:9,
      color:"#ff453a",
      fontFamily:'cerapro-med',
      padding:5
  },
  Technicianid:{
    fontSize:14,
    color:"#000000",
    fontFamily:'cerapro-med',
    padding:5
},Techtext:{
    fontSize:9,
    color:"#ff453a",
    fontFamily:'cerapro-med',
    padding:5,
    alignSelf:'flex-end'
}

  });