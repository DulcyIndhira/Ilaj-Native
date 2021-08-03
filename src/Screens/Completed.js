import React from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
//import * as Font from 'expo-font';
//import { AppLoading } from 'expo';
import moment from 'moment';
import Toast from 'react-native-simple-toast';

import {
  MaterialIndicator,
 } from 'react-native-indicators';
// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   });
//   };
  let a='';

 class CompletedView extends React.Component{
  constructor(){
    super();
    this.state={
      dataloading:false,
      datetime:'',
      serviceDescription:'',
      Status:'',
      time:'',
      mode:''
    }
  }
  getTimeDiff = (startTime, endTime) => {
    const xStartTime = moment(startTime, "YYYY-MM-DD HH:mm");
    const xEndTime = moment(endTime, "YYYY-MM-DD HH:mm");
    if (moment(xStartTime).isValid() && moment(xEndTime).isValid()) {
        let days =  xEndTime.diff(xStartTime,'days')
        let hrs = xEndTime.diff(xStartTime,'hours')
        let mins = xEndTime.diff(xStartTime,'minutes') % 60
        // End Date is less than Start Date
        if (days<0 || hrs < 0 || mins < 0) { return "NA"}
        if (hrs>23) {hrs = hrs % 24; }
        return (days>0? days+"d ":"") + (hrs < 10? "0" + hrs: hrs) + ":" + (mins<10?"0"+mins:mins) + "hrs"
    } else {
        return 'NA';
    }
  }
  
  componentDidMount(){
    var str = String(this.props.data.serviceDateTime).split(' ')
    var date=str[0]
    var t=str[1]
    var m=str[2]
    this.setState({mode:m})
    this.setState({time:t})
    a=moment(date).format('Do MMMM YYYY');
    this.setState({datetime:a});

    var b =String(this.props.data.serviceStatus).split(' ');
    var c=''
   if(b.length===3){
      c=b[2]
      this.setState({Status:c})
   }
   else{
      c=b[1]
      this.setState({Status:c})
   }
   if(this.props.data.serviceDescription==''||this.props.data.serviceDescription==undefined){
      this.setState({serviceDescription:'NA'})
    }
    else{
      this.setState({serviceDescription:this.props.data.serviceDescription})
    }
    // if(!this.state.dataloading){
    //   return(
    //     <AppLoading
    //     startAsync={fetchFonts}
    //     onFinish={()=>this.setState({dataloading:true})}/>
    //   );
    // }
  
   }
    render(){
        return(
          <View style={{flex:1}}>
           <View style={styles.container}>
              <View style={styles.card}>
              <View style={styles.row}>
                  <Text style={styles.textinBlack}>{this.props.data.serviceName}</Text>
                  <Text style={styles.textinOrange}>{this.state.datetime} {this.state.time}{this.state.mode}</Text>
              </View>
                <View style={{marginTop:15}}>
                    <Text style={styles.textinBlack} >Service Description</Text>
                    <Text style={styles.textinOrange}>{this.state.serviceDescription}</Text>
                    <Text style={[styles.textinBlack, styles.margin15]} >{this.props.data.natureOfWorkHeading}</Text>
                    <Text style={styles.textinOrange}>{this.props.data.natureOfWork}</Text>
                </View>
              <View>
                  <Text style={[styles.textinBlack, styles.margin15]}>Address</Text>
                  <Text style={styles.textinOrange}>{this.props.data.serviceAddress}</Text>
              </View>
              <View style={styles.row}>
                  <View style={{width:'65%'}}>
                      <Text style={styles.customername}>Customer Name</Text>
                      <Text style={styles.textinOrange}>{this.props.data.customerName}</Text>
                  </View>
                  <View style={styles.setRightEnd}>
                      <Text style={styles.textinBlack}>OrderID</Text>
                      <Text style={styles.textinOrange}>{this.props.data.orderId}</Text>
                  </View>
                </View>

              <View style={styles.row}>
                  <View>
                      <Text style={styles.textinBlack} >TOTAL HOURS</Text>
                      <Text style={styles.servicehrsitem}>{this.getTimeDiff(this.props.data.serviceStartDateTime, this.props.data.serviceEndDateTime)} </Text>
                  </View>
                  <View style={[styles.setRightEnd]}>
                      <Text style={[styles.textinOrange,{fontSize:18,marginTop:6}]}>Status</Text>
                      <Text style={[styles.textinBlack,{fontSize:18,paddingTop:3}]}>{this.state.Status}</Text>
                  </View>
              </View>
            </View>
          </View>
          </View>
        )
    }

}


const styles=StyleSheet.create({
 
  container :{
    width:"84%",
    flex:1,
    marginTop:30,
    marginLeft:30,
  },
  card:{
    paddingLeft:18,
    paddingTop:18,
    paddingRight:18,
    paddingBottom:25,
    borderWidth:1,
    borderColor:"#e5e5e5",
    backgroundColor:'#f8f8f8',
    borderRadius:4
 },
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:15
  },
  margin16:{
    marginRight:30
  },
  textinOrange:{
    color:"#ff453a",fontSize:12,fontFamily:'cerapro-med',
    lineHeight:15,
    marginTop:3
  },
  textinBlack: {
    color:"#262626",fontSize:12,fontFamily:'cerapro-med',
    lineHeight:15,
    marginTop:5
  },
  margin15:{
    marginTop:15
  },
  servicehrsitem:{
    fontSize:22,color:"#ff453a",fontFamily:'cerapro-med'
  },
  textcolor:{
    color:"red",fontSize:12,fontFamily:'cerapro-med'
  },
  viewspacing:{
    padding:10
  },
  textbold:{
    fontWeight: "300",
  },
  textSize:{
    fontSize: 20,
  },
  setRightEnd: {
    alignItems:'flex-end',marginRight:1
  }
})


export default class  Completed extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      visible:true
    }
  }
    componentDidMount(){
      fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devId:"asdsadsdasdsdsdsad",
          userId:this.props.userid ,
        })
    })
    .then(response => response.json())
            .then((responseJson) => {
              if(responseJson.success==='true'){
                this.setState({visible:false})
                this.setState({data:responseJson.data._completedTechServiceList})
                this.forceUpdate();
              }
   
            })
            .catch((error) => {console.log(error)
              this.setState({visible:false})
            
              Toast.show('Something went wrong')}
                )   
   }

shouldComponentUpdate(nextProps, nextState) {
  
  if (this.state.data !== nextState.data) {
    return true;
  }
  return false;
}
  render(){
      return(
        <View style={{flex:1}}>
           {
            this.state.visible&&
            <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
            <View style={{paddingLeft:18,
              height:50,
              width:50,
              marginTop:20,
              paddingTop:10,
              paddingRight:18,
              paddingBottom:10,
              borderWidth:1,
              borderColor:"#e5e5e5",
              backgroundColor:'#f8f8f8',
              borderRadius:4}}>
              <MaterialIndicator color='#ff453a' />
            </View>
            </View>
          }
          {!this.state.visible&&
         Object.keys(this.state.data).length===0?
         <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
         <View style={{paddingLeft:18,
        
         marginTop:'40%',
           paddingTop:10,
           paddingRight:18,
           paddingBottom:10,
           }}>
        <Text style={{color:'#434343',
         fontSize:16,
         fontFamily:'cerapro-med',
        }}>No Records Found</Text>
         </View>
         </View>:

          <FlatList
              data={this.state.data}
              initialNumToRender={10}
              renderItem={({ item,i }) => (
                <CompletedView  data={item} key={item.orderId} userId={this.props.userid}
                ></CompletedView>
              )}
              keyExtractor={item => item.orderId}
              />}
        </View>
      )
  }
}