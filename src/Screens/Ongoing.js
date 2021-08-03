import React,{useState,useEffect} from 'react';
import {Text,Dimensions,View,TouchableOpacity,StyleSheet,FlatList,AsyncStorage} from 'react-native';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import moment from 'moment';
import {
  MaterialIndicator,
 } from 'react-native-indicators';
import Toast from 'react-native-simple-toast';
// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   });
//   };

  let a=''
class OngoingView extends React.Component{
constructor(props){
  super(props)

  this.state={
    startedTime:'',
    showQuote:false,
    dataloading:false,
    showcash:'start',
    datetime:'',
    serviceDescription:'',
    time:'',
    mode:'',
    status:'',
    serviceStatus:'',
    timeforleft:'',
    hour:'',
    minute:'',
    isActive:true,
    hidecash:false,
    serviceStartDateTime:'',
    paymentMode:'',
    message:''
    }
}
componentDidMount(){
  AsyncStorage.getItem('paymentmodess').then(value=>{
    if(value==null){
console.log(value)
    }
    else{
     
this.setState({paymentMode:value})
    }
  })
  AsyncStorage.getItem('messagess').then(value=>{
    if(value==null){
      console.log(value)

    }
    else{
     

this.setState({message:value})
    }
  })

  //new change
//   AsyncStorage.getItem('cash').then(value=>{
//     if(value==null){
//       AsyncStorage.getItem('raisequote').then(value=>{
//         if(value==null){
         
    
//         }
//         else{
         
//           if(JSON.parse(value)===this.props.data.orderId){
//             this.setState({showQuote:true})
//             }
//         }
//       })

//     }
//     else{
     
// if(JSON.parse(value)===this.props.data.orderId){
// this.setState({showcash:'finish'})
// }
//     }
//   })
  
  var str = String(this.props.data.serviceDateTime).split(' ')
  var date=str[0]
  var t=str[1]
 var m=str[2]
 var l= str[1].concat(" " ,str[2]);
 this.setState({mode:m})
 this.setState({time:t})

  var mom=moment(l, "h:mm a").fromNow();
  this.setState({timeforleft:mom})
  let currentdate = new Date();

let hours = moment().format('h:mm a');
this.setState({hour:hours})
//  console.log('mom',mom)
 var str1 = String(this.props.data.serviceStatus).split(' ')
 a=moment(date).format('Do MMMM YYYY');
this.setState({serviceStatus:str1[2]})
 if(this.props.data.serviceDescription==''||this.props.data.serviceDescription==undefined){
   this.setState({serviceDescription:'NA'})
 }
 else{
   this.setState({serviceDescription:this.props.data.serviceDescription})
 }
 if(this.props.data.serviceStartDateTime==''|| this.props.data.serviceDescription == undefined){
    this.setState({serviceStartDateTime:''})
}
else{

 var str3=String(this.props.data.serviceStartDateTime).split(' ')
var e=moment(str3[0]).format('Do MMMM YYYY');
 var c=str3[1].concat(' ',str3[2])
 var join=e.concat(' ',c)
  this.setState({serviceStartDateTime:c})

}
 this.setState({datetime:a})

  // if(!this.state.dataloading){
  //   return(
  //     <AppLoading
  //     startAsync={fetchFonts}
  //     onFinish={()=>this.setState({dataloading:true})}/>
  //   );
  // }
}
onStartservice=()=>{
  this.setState({showResponse:true})
  fetch('http://webapi.ilajservices.com/api/Technician/serviceStartEnd', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      devId:"sadsadsadsd",
userId: this.props.userId,
serviceId: this.props.data.serviceId,
orderId: this.props.data.orderId,
status: 0,
    })
  })
  .then(response => response.json())
          .then((responseJson) => {
           
                        if(responseJson.success==='true'){
              this.props.onEndservice()
            }
           //this.setState({data:responseJson.data})  
          })
          .catch(error => console.log(error)) 
}
onRequestquote(){
  fetch('http://webapi.ilajservices.com/api/Technician/RaiseAQuoteRequest', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      devId:"asdsadsadsad",
userId: this.props.userId,
orderId: this.props.data.orderId,
serviceId: this.props.data.serviceId,


    })
  })
  .then(response => response.json())
          .then((responseJson) => {
           console.log(responseJson)
            if(responseJson.success==='true'){
              AsyncStorage.setItem('cash',JSON.stringify((this.props.data.orderId)))

              this.setState({showcash:'finish'})

              this.props.onEndservice()
              Toast.show('Request ended sucessfully')
            }
           //this.setState({data:responseJson.data})  
          })
          .catch(error => console.log(error)) 

}

onEndservice=()=>{
  fetch('http://webapi.ilajservices.com/api/Technician/serviceStartEnd', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      devId:"sadsadsadsd",
userId: this.props.userId,
serviceId: this.props.data.serviceId,
orderId: this.props.data.orderId,
status: 1,
    })
  })
  .then(response => response.json())
          .then((responseJson) => {
           
            if(responseJson.success==='true'){
AsyncStorage.removeItem('cash')
AsyncStorage.removeItem('raisequote')
              this.props.onEndservice()
              this.props.newTab()
              Toast.show('Request finished sucessfully')
  

            }
          })
          .catch(error => console.log(error)) 
}
EndServicemethod=()=>{
  AsyncStorage.setItem('raisequote',JSON.stringify((this.props.data.orderId)))
  this.setState({showQuote:true,isActive:false})
}
onRequestquoteNo=()=>{
  AsyncStorage.setItem('cash',JSON.stringify((this.props.data.orderId)))
  this.setState({showcash:'finish'})
  Toast.show('Request ended successfully')
}
  render(){
        return(
          <View style={{flex:1}}>

          <View style={styles.container}>
      
  {this.state.showcash==='start'&&
  this.props.data.serviceStatus==='You have started'?
               <View style={styles.card}>
                
              
         <View style={styles.servicename}>
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
                <Text style={styles.textinBlack, styles.margin15}>Address</Text>
                <Text style={styles.textinOrange}>{this.props.data.serviceAddress}
                </Text>
              </View>
              <View style={styles.row}>
                  <View>  
                    <Text style={styles.textinBlack}>Customer Name</Text>
                    <Text style={styles.textinOrange}>{this.props.data.customerName}</Text>
                  </View>
                  <View style={styles.setRightEnd}>
                    <Text style={styles.textinBlack}>OrderID</Text>
                    <Text style={styles.textinOrange}>{this.props.data.orderId}</Text>
                  </View>
              </View>
        <View style={styles.viewspacing}></View>
      
            {this.props.data.serviceStatus==='You have started'&&
             <View style={styles.textcenter} >
        <Text style={{fontSize:12,fontFamily:'cerapro-med'}} >{this.state.serviceStartDateTime==''?'':'Started at '+this.state.serviceStartDateTime}</Text>
 
                    </View>
            } 
                    <View style={{padding:10}}></View>
                    { !this.state.showQuote&&this.props.data.serviceStatus==='You have started'&&
                    <View style={styles.buttoncenter}>
                    <TouchableOpacity onPress={this.EndServicemethod}>
                    <View style={styles.button}>
                      <Text style={styles.buttontext}>End Service</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                   }
                   {this.state.showQuote&&
               <View>
                 <Text style={{fontSize:12}}>Request Quote</Text>
                 <View style={{padding:3}}></View>
                 <View style={styles.buttoncenter}>
                  <TouchableOpacity onPress={this.onRequestquote.bind(this)}>
                    <View style={styles.button}>
                      <Text style={styles.buttontext}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{padding:5}}></View>
                  <TouchableOpacity onPress={this.onRequestquoteNo}>
                    <View style={styles.button}>
                      <Text style={styles.buttontext}>No</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
            </View>
            }

          </View>
  :<View></View> }
          
   {this.state.showcash==='finish'&&
          <View style={styles.card}>
          <View style={[styles.row,{marginTop:15}]}>
            <Text style={styles.textinBlack}>Payment Mode</Text>
          <Text style={styles.textinOrange}>{this.state.paymentMode}</Text>
          </View>
            <View style={{flex:1}}>
            <Text style={{fontFamily:'cerapro-med',color:'#434343',fontSize:18,paddingTop:16,paddingBottom:30}}> {this.state.message} </Text>
            </View>
            <View style={styles.buttoncenter}>
                              <TouchableOpacity style={{marginTop:3}} onPress={this.onEndservice}>
                              <View style={styles.buttonendservice}>
                                <Text style={styles.buttontext}>Finish Service</Text>
                              </View>
                            </TouchableOpacity>
                            </View>
            
            
                    </View>
          
       }
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
    paddingTop:0.5,
    paddingRight:18,
    paddingBottom:10,
    borderWidth:1,
    borderColor:"#e5e5e5",
    backgroundColor:'#f8f8f8',
    borderRadius:4
 },
 row: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 15
},
setRightEnd: {
  alignItems: 'flex-end', marginRight: 1
},
  servicename:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:15
  },

  textinOrange:{
    color:"#ff453a",
    fontSize:12,fontFamily:'cerapro-med',
    lineHeight:15,
    marginTop:3
  },
  textinBlack: {
    color:"#262626",
    fontSize:12,fontFamily:'cerapro-med',
    lineHeight:15,
    marginTop:5
  },
margin15:{
  marginTop:15
},
  cardcash:{height:213,width:305,
    borderWidth:1,borderColor:"#e5e5e5",backgroundColor:'#f8f8f8'
    ,borderRadius:4},
  
  
  servicenametitle:{
    color:"#262626",fontSize:12,fontFamily:'cerapro-med'
  },
  servicedate:{
     color:"#ff453a",fontSize:12,fontFamily:'cerapro-med'
  },
  servicedescription:{
    color:"#262626",fontSize:12,fontFamily:'cerapro-med'
  },
  servicedesitem:{
   fontSize:12,color:"#ff453a",fontFamily:'cerapro-med'
  },
  natureofwork:{
     fontSize:12,color:"#262626",fontFamily:'cerapro-med'
  },
  natureofworkitem:{
   color:"#ff453a",fontSize:12,fontFamily:'cerapro-med'
  },
  address:{
   color:"#434343",fontFamily:'cerapro-med'
  },
  addressitem:{
     color:"#ff453a",fontSize:12,fontFamily:'cerapro-med'
  },
  customername:{
    color:"#000000",fontSize:12,fontFamily:'cerapro-med'
  },
  customernameitem:{
    fontSize:12,color:"#ff453a",fontFamily:'cerapro-med'
  },
  textcolor:{
    color:"red",fontFamily:'cerapro-med'
  },
  
  viewspacing:{
     padding:10
  },

  textbold:{
    fontWeight: "100",fontFamily:'cerapro-med'
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
      justifyContent:"center",
     },
    button: {
     // marginBottom: 30,
      width: 133,
      alignItems: "center",
      backgroundColor:"#ff453a",
      borderRadius:4,height:39
    },
    buttonendservice: {
       marginTop: 20,
       width: 133,
       alignItems: "center",
       backgroundColor:"#ff453a",
       borderRadius:4,height:39
     },
   buttontext: {
      textAlign: "center",
       padding: 10,
      color: "white",fontSize:10,fontFamily:'cerapro-med'
    }
  
})



export default class  Ongoing extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data:[],
      check:false,
      visible:true
    }
    //this.Ongoinglist=this.Ongoinglist.bind(this)
  }
  onEndserviceclick(){
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
             var a=responseJson.data._onGoingTechServiceList
             var array = Object.values(a);
              this.setState({data:array})
              this.forceUpdate();
}
          
            })
            .catch(error => console.log(error)) 
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
                  let a=responseJson.data._onGoingTechServiceList
                  var array = Object.values(a);
                  this.setState({visible:false})
                  const Ongoing = array.filter( (item) => {
                    return item.serviceStatus === 'You have started'
                  }) 
                  this.setState({data:Ongoing})
                })
                .catch((error) => {console.log(error)
                  this.setState({visible:false})
                
                  Toast.show('Something went wrong')}
                    )  
          
             }
         

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.startservice !== nextState.startservice) {
      return true;
    }
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
         </View>
         :

          <FlatList
          data={this.state.data}
          initialNumToRender={10}
          renderItem={({ item,index }) => (

          <OngoingView navigation={this.props.navigation} newTab={this.props.newTab}  onEndservice={this.onEndserviceclick.bind(this)} data={item} key={index} userId={this.props.userid}
          ></OngoingView>
          )}
          keyExtractor={item => item.orderId}
          />

          }
         
        </View>
      )
  }
}

const screen = Dimensions.get('window');

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

 const App=({isActive})=> {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);


  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs + 1);
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);


  return (
    <>
      <Text style={styless.timerText}>{`${mins}H:${secs}S`}</Text>
      </>
  );
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderWidth: 10,
      borderColor: '#B9AAFF',
      width: screen.width / 2,
      height: screen.width / 2,
      borderRadius: screen.width / 2,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontSize: 45,
      color: '#B9AAFF'
  },
  timerText: {
      color: '#000',
      fontSize: 20,
      marginBottom: 20
  },
  buttonReset: {
      marginTop: 20,
      borderColor: "#FF851B"
  },
  buttonTextReset: {
    color: "#FF851B"
  }
});