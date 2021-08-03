import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,FlatList,} from 'react-native';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {
  MaterialIndicator,
} from 'react-native-indicators';
//import { Modal, Portal, Provider } from 'react-native-paper';
// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   });
//   };
  let a=''
class NewView extends React.Component{
   constructor(props){
     super(props)
     this.state={
       dataloading:false,
       datetime:'',serviceDescription:'',
       showResponse:false,
       visibleModal:false,
       reasonText:'',
       time:'', 
       mode:'',
       decline:false,
       hide:false,
       hidecard:true
     }
   }
   componentDidMount(){
 var str = String(this.props.data.serviceDateTime).split(' ')
  var date=str[0]
 a=moment(date).format('Do MMMM YYYY');
 //console.log(a)
 var t=str[1]
 var m=str[2]
 this.setState({mode:m})
 this.setState({time:t})
 this.setState({datetime:a})
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
    // console.log(this.props.item.serviceDateTime)
   }
 
   onAcceptService(){
    fetch('http://webapi.ilajservices.com/api/Technician/acceptRejectService', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId:"sdadsasdjiowjiowqje",
  userId: this.props.userId,
  serviceId: this.props.data.serviceId,
  orderId: this.props.data.orderId,
  status: 0,
  rejectReason: this.state.reasonText
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
             // console.log(responseJson)
              if(responseJson.success==='true'){
                this.setState({hide:true})
                this.props.onStartservice()
                Toast.show('Request accepted sucessfully')
              }
            // this.setState({data:responseJson.data,showResponse:true})  
            })
            .catch(error => console.log(error))  
   }
  
 
   
    render(){
        return(
          <View style={{flex:1}}>
           
            {Object.keys(this.props.data).length===0?<Text style={{color:'black',fontSize:16,fontFamily:'cerapro-med'}}>No Record Found</Text>:
             this.props.data.serviceStatus=='You are allocated'&&
           <View style={styles.container}>
{this.props.hide==''&&
this.state.hide==false&&   <View style={styles.card}>  
                  {/* {this.props.data.serviceStatus==='You have accepted.'&&   <View style={{width:'100%',flex:1,flexDirection:'row',justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <View style={{width:'12%', alignItems:'flex-start'}}>
                  <Image source={require('../assets/drawable-hdpi/group_755.png')} style={{height:22,width:22}}/>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{fontSize:12,fontFamily:'cerapro-med',color:'#000000'}}>Time Left For Service 00:30hrs</Text>
                </View>
                <View style={{width:'12%', alignItems:'flex-end'}}>
                  <Image style={{marginRight:0,height:22,width:22}} source={require('../assets/call_24_px.png')}/>
                </View>
              </View>} */}
              <View style={styles.servicename}>
                  <Text style={styles.textinBlack}>{this.props.data.serviceName}</Text>
                  <Text style={styles.textinOrange}>{this.state.datetime}  {this.state.time}{this.state.mode}</Text>
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
              <View style={[styles.margin15,{ flexDirection:"row"}]}>
                  <View style={{width:'60%'}}>
            <Text style={styles.textinBlack}>Customer Name</Text>
                    <Text style={styles.textinOrange}>{this.props.data.customerName}</Text>
                  </View>
                  <View style={{alignItems:'flex-end'}}>
                    <Text style={[styles.textinBlack]}>OrderID</Text>
                    <Text style={[styles.textinOrange]}>{this.props.data.orderId}</Text>
                  </View>
              </View>
              <View style={{padding:6}}></View> 
              {this.props.data.serviceStatus==='You have accepted.'&& 
                      <View style={styles.buttoncenter}>
                        <TouchableOpacity onPress={this.onStartservice}>
                          <View style={styles.button}>
                            <Text style={styles.buttontext}>Start Service</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    }
                    {!this.state.showResponse&&this.props.data.serviceStatus==='You are allocated'&&
                        <View>
                          <View style={styles.buttoncenter}>
                            <TouchableOpacity onPress={this.onAcceptService.bind(this)}>
                              <View style={styles.button}>
                                <Text style={styles.buttontext}>Accept</Text>
                              </View>
                            </TouchableOpacity>
                            <View style={{padding:5}}></View>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Decline',{
                              userId:this.props.userId,
                              serviceId:this.props.data.serviceId,
                              orderid:this.props.data.orderId,

                            })}} style={{marginLeft:10}}>
                              <View style={styles.buttondecline}>
                                <Text style={styles.declinebuttontext}>Decline</Text>
                              </View>
                            </TouchableOpacity>
                            </View>
                        </View>
                      }     
                </View>
    }
   
            </View>
                    }
                    
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
    paddingTop:10,
    paddingRight:18,
    paddingBottom:10,
    borderWidth:1,
    borderColor:"#e5e5e5",
    backgroundColor:'#f8f8f8',
    borderRadius:4
 },

  servicename:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:15
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

  statushrs:{
    fontSize:26,fontFamily:'cerapro-med'
  },
  textcolor:{
    color:"red"
  },
  
  viewspacing:{
     padding:10
  },
  
  textbold:{
    fontWeight: "100"
  },
  textsize:{
    fontSize: 20,
  },
    textcenter:{
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center",
    },
     buttoncenter:{
      flexDirection:"row",
      justifyContent: "center",
     },
    button :{
      //marginBottom: 30,
      width:110,
      alignItems: "center",
      backgroundColor:"#ff453a",
      borderRadius:4,height:39,

    }, buttondecline :{
      //marginBottom: 30,
      width:110,
      alignItems: "center",
      backgroundColor:'#f8f8f8',
      borderWidth:1,
      borderColor:"#e5e5e5",
      borderRadius:4,height:39,

    },
   buttontext :{
      textAlign: "center",
       padding: 10,
       fontSize:10,
      color: "white", lineHeight:13,fontFamily:'cerapro-med'
    },
    declinebuttontext :{
      textAlign: "center",
       padding: 10,
       fontSize:10,
      color: "#434343", lineHeight:13,fontFamily:'cerapro-med'
    },
  
})

export default class  New extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      pressed:'',
      hide:'',
      visible: true,
      
    }
    //this.Newlist=this.Newlist.bind(this)
    
  }
  // onclickdecline=()=>{
  //   console.log('pressed')
  //   this.onDecline();
  // }
 componentDidMount(){
   // console.log('aject',this.props.reject)
//    // BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick)

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
              if(responseJson.success==='true') {
              this.setState({visible:false})

              let a=responseJson.data._newTechServiceList
              const Accepted = a.filter( (item) => {
                return item.serviceStatus === 'You are allocated'
              }) 
               this.setState({data:Accepted})
// this.forceUpdate();
              }
            })
            .catch((error) => {console.log(error)
              this.setState({visible:false})
            
              Toast.show('Something went wrong')}
                )  
      this.declinerefresh();   
         
        }
  onStartserviceclick(){
    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        devId:"asdsadsdasdsdsdsad",
  userId:this.props.userid ,
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
             if(responseJson.success==='true') {
               this.setState({visible:false})
               let a=responseJson.data._newTechServiceList

               const Accepted = a.filter( (item) => {
                return item.serviceStatus === 'You are allocated'
              }) 
               this.setState({data:Accepted})
               this.forceUpdate();
}
          
            })
            .catch((error) => {console.log(error)
          Toast.show(error)}
            ) 
//this.Newlist();
  }
  shouldComponentUpdate(nextProps, nextState) {
    // if (this.props.color !== nextProps.color) {
    //   return true;
    // }
    if (this.state.data !== nextState.data) {
      return true;
    }
    return false;
  }

declinerefresh= async()=>{
  try {
    setInterval(async () => {
  await fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
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
                if(responseJson.success==='true') {
                this.setState({visible:false})
  
                let a=responseJson.data._newTechServiceList
                const Accepted = a.filter( (item) => {
                  return item.serviceStatus === 'You are allocated'
                }) 
                 this.setState({data:Accepted})
  // this.forceUpdate();
                }
              })
              .catch((error) => {console.log(error)
                this.setState({visible:false})
                Toast.show(error)}
                  ) 
           
            }, 1000);
          } catch(e) {
            console.log(e)
            this.setState({visible:false})
            Toast.show(e)
          }
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

 <NewView navigation={this.props.navigation} onDecline={this.props.onDecline} hide={this.state.hide}   onStartservice={this.onStartserviceclick.bind(this)} data={item} key={i} userId={this.props.userid}
 ></NewView>
)}
keyExtractor={item => item.orderId}
/>}
        </View>
      )
  }
}


