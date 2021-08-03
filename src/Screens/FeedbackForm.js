import React from 'react';
import {View,BackHandler} from 'react-native';
import RatingYellow from './RatingYellow';
import Feedback from './Rating';
import HeaderView from './HeaderView';
//import * as Font from 'expo-font';
//import { AppLoading } from 'expo';

import FooterView from './FooterView';
// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   'cerapro-bold': require('../../assets/fonts/CeraPro-Bold.ttf')
//   });
//   };
  let a=''

 export default class FeedbackForm extends React.Component{
  constructor(props){
      super(props);
      this.state={
          dataloading:false,
          Id:'',
          userName:'',
          userId:''
      }
  }
    componentDidMount(){ 
        this.backButton = BackHandler.addEventListener('hardwareBackPress', () =>{
            this.props.navigation.navigate('Dashboard')
            return true;
            });
        const {state} =this.props.navigation;
        this.setState({Id:state.params.id})
        this.setState({userId:state.params.userId})

        this.setState({userName:state.params.userName})
        if(!this.state.dataloading){
            return(
            <AppLoading
            startAsync={fetchFonts}
            onFinish={()=>this.setState({dataloading:true})}/>
            );
        }
   }
   componentWillUnmount(){
    this.backButton.remove();
    }
    render(){
        return(

            <View style={{ flex: 1, marginTop:18,backgroundColor:"#f8f8f8" }}>
                <HeaderView id={this.state.Id} userName={this.state.userName} pageTitle={"FEEDBACK"}  /> 

                <View style={{height:20, marginTop:20, width:'60%',flexDirection:'row',alignSelf:'center'}}>
                    <RatingYellow navigation={this.props.navigation}/>
                </View>
                <View style={{borderWidth: 1 ,borderColor:"#ccc", marginTop:20}}></View>
            <View style={{flex:1}}><Feedback Id={this.state.userId} navigation={this.props.navigation}/></View>
            
            <View style={{marginBottom:5,bottom:0,left:2,right:13,opacity :1,}}>
                <FooterView myservice='myservice' feedback='feedbackform' navigation={this.props.navigation}/>
            </View>
            </View>
        )
    }
}
