import React from 'react';
import { Text, Image, TextInput, View, TouchableOpacity, StyleSheet, FlatList,Alert,Button,AsyncStorage } from 'react-native';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import moment from 'moment';
import call from 'react-native-phone-call'
import Toast from 'react-native-simple-toast';
import {
  MaterialIndicator,
} from 'react-native-indicators';
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   });
// };
import Icon from 'react-native-vector-icons/Entypo'
const minTimetoStartService = 30 //in minutes
const maxTimetoStartService = -60 //in minutes
let a = ''

let now = ''
class AcceptedView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dataloading: false,
      showcash: 'start',
      datetime: '',
      serviceDescription: '',
      time: '',
      mode: '',
      serviceStatus: '',
      request: '',
      show: true,
      OTP: '',
      otperror: '',
      checklisttitle:'',
      checkList:[],
      otpshow:'No',
      step:[],
      confirm:[],
      orderId:'',
      stepname:true,
      startservice:false,
      disabledbutton:false
    }
    //this.timeDiffCalc = this.timeDiffCalc.bind(this)
  }
  componentDidMount() {
    let a=''
    let mess=''
   
    AsyncStorage.getItem('confirmss').then(values=>{
      if(JSON.parse(values)==null){
        console.log('confirms',values)
        AsyncStorage.getItem('stepssss').then(value=>{
          if(value==null){
            this.setState({show:true})
          }
          else{
            
            if(JSON.parse(value)===this.props.data.orderId){
              
              fetch('http://webapi.ilajservices.com/api/Technician/NavigateTechnician', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    devId: "sadsadsadsd",
                            userId: this.props.userId,
                            serviceId: this.props.data.serviceId,
                            orderId: this.props.data.orderId,
                  
                  })
                })
                .then(response => response.json())
                        .then((responseJson) => {
                         //console.log(responseJson)
                         this.setState({checklisttitle:responseJson.data.checkListTitle})
                         //console.log('mm',responseJson.data.checkList.length)
            
                         this.setState({disabledbutton:true,stepname:false})
                          if (responseJson.data.checkList==null) {
                            this.setState({show:true})
                            this.setState({startservice:true}) 
                           //this.setState({stepname:'acceptnavigate'})
                          }
                          else{
                            
                            responseJson.data.checkList.map((item)=>{
                              this.state.checkList.push(item)
                             
                             })
                             this.setState({show:false})
                        }
                        })
                        .catch((error) => console.log(error)
                           )  
             
            }
            else{
              this.setState({show:true})
            }
          }
        })
       
      }
      else if(JSON.parse(values)===this.props.data.orderId){
        console.log('confo',values)
        this.setState({show:true,startservice:true})
      }
      else{
        AsyncStorage.getItem('stepssss').then(value=>{
          if(value==null){
            this.setState({show:true})
          }
          else{
            
            if(JSON.parse(value)===this.props.data.orderId){
              
              fetch('http://webapi.ilajservices.com/api/Technician/NavigateTechnician', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    devId: "sadsadsadsd",
                            userId: this.props.userId,
                            serviceId: this.props.data.serviceId,
                            orderId: this.props.data.orderId,
                  
                  })
                })
                .then(response => response.json())
                        .then((responseJson) => {
                         console.log('checklist',responseJson)
                         this.setState({checklisttitle:responseJson.data.checkListTitle})
                         //console.log('mm',responseJson.data.checkList.length)
            
                         this.setState({disabledbutton:true,stepname:false})
                          if (responseJson.data.checkList==null) {
                            this.setState({show:true})
                            this.setState({startservice:true}) 
                           //this.setState({stepname:'acceptnavigate'})
                          }
                          else{
                            
                            responseJson.data.checkList.map((item)=>{
                              this.state.checkList.push(item)
                             
                             })
                             this.setState({show:false})
                        }
                        })
                        .catch((error) => console.log(error)
                           )  
             
            }
            else{
              this.setState({show:true})
            }
          }
        })
       
      }
    })
   
 
   



    this.setState({ request: 'started' })
    var str = String(this.props.data.serviceDateTime).split(' ')
    var date = str[0]
    var t = str[1]
    var m = str[2]
    var sec=String(str[1]).split(':')
    this.setState({ mode: m })
    this.setState({ time: t })
    var str1 = String(this.props.data.serviceStatus).split(' ')
    a = moment(date).format('Do MMMM YYYY');
    this.setState({ serviceStatus: str1[2] })
    if (this.props.data.serviceDescription == '' || this.props.data.serviceDescription == undefined) {
      this.setState({ serviceDescription: 'NA' })
    }
    else {
      this.setState({ serviceDescription: this.props.data.serviceDescription })
    }
    
    this.setState({ datetime: a })
   
    // if (!this.state.dataloading) {
    //   return (
    //     <AppLoading
    //       startAsync={fetchFonts}
    //       onFinish={() => this.setState({ dataloading: true })} />
    //   );
    // }
  }
DialCustomer=(mobile)=>{
  const args = {
    number: mobile, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
  }
  
  call(args).catch(console.error)
}

  changehandler(value) {
  
        this.setState({ OTP: value })
        this.setState({otperror:''})
  
}  
getOverdueStatus = (endTime) => {
    const startTime=moment().format("YYYY-MM-DD HH:mm")
    const xStartTime = moment(startTime, "YYYY-MM-DD HH:mm");
    let xEndTime = moment(moment(endTime, "YYYY-MM-DD HH:mm A").format("YYYY-MM-DD HH:mm"),"YYYY-MM-DD HH:mm")
    if (moment(xStartTime).isValid() && moment(xEndTime).isValid()) {
        let days =  xEndTime.diff(xStartTime,'days')
        let hrs = xEndTime.diff(xStartTime,'hours')
        let mins = xEndTime.diff(xStartTime,'minutes') 
        if (mins < 0) { return "OD"}
       
        mins = mins % 60
        if (hrs>23) {hrs = hrs % 24; }
            return "Service due in " + (days>0? days+" days ":"") + (hrs < 10? "0" + hrs: hrs) + ":" + (mins<10?"0"+mins:mins) + " hrs"
  } else {
      return 'NA';
  }
}
checkServiceValidity = (startTime, endTime) => {
  let xStartTime = moment(startTime, "YYYY-MM-DD HH:mm");
  let xEndTime = moment(moment(endTime, "YYYY-MM-DD HH:mm A").format("YYYY-MM-DD HH:mm"),"YYYY-MM-DD HH:mm")
  if (moment(xStartTime).isValid() && moment(xEndTime).isValid()) {
    let diffMin = xEndTime.diff(xStartTime,'minutes')
    if (diffMin > maxTimetoStartService-1 && diffMin < minTimetoStartService+1) {
      return "Start"  
    } else {
      return "Stop"
    }
  }  else {
    return "Stop"
  } 
}

onStartservice = () => {
let that=this;
    if (Object.keys(this.props.ongoingdata).length > 0) {
      Toast.show('Another service is running ,Please check ongoing tab')

    }
    else {
      let Accept=[]
      fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devId: "asdsadsdasdsdsdsad",
          userId: this.props.userId
        
        })
      })
        .then(response => response.json())
        .then((responseJson) => {
          //console.log(responseJson)
          if (responseJson.success === 'true') {
           let a=responseJson.data._newTechServiceList
            Accept = a.filter((item) => {
            return item.serviceOtp ==this.state.OTP&&item.orderId==this.props.data.orderId
          })
          if (Accept.length == 0) {
            this.setState({ otperror: 'Invalid OTP' })
          }
          else {
    
            this.setState({ showResponse: true })
            fetch('http://webapi.ilajservices.com/api/Technician/serviceStartEnd', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                devId: "sadsadsadsd",
                userId: this.props.userId,
                serviceId: this.props.data.serviceId,
                orderId: this.props.data.orderId,
                status: 0,
              })
            })
              .then(response => response.json())
              .then((responseJson) => {
                console.log('start',responseJson)
                if (responseJson.success === 'true') {
                  AsyncStorage.removeItem('stepssss')
                  AsyncStorage.removeItem('confirmss')
                  console.log('paymentmessage',responseJson.data.messageText)

                  console.log('payment',responseJson.data.paymentMode)
                  AsyncStorage.setItem('paymentmodess',responseJson.data.paymentMode)
                  AsyncStorage.setItem('messagess',responseJson.data.messageText)
                  this.setState({ request: 'started' })
                  this.props.onEndservice()
                  this.props.Ongoing()
                  Toast.show('Request started sucessfully')
                }
                //this.setState({data:responseJson.data})  
              })
              .catch(error => console.log(error))
    
          }
    

          }
          //this.setState({data:responseJson.data})  
        })
        .catch(error => console.log(error))
     
    }

  }

  Startservicevalidation = () => {
    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId:"asdsadsdasdsdsdsad",
  userId:this.props.userId,
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
              let a=responseJson.data._onGoingTechServiceList
              var array = Object.values(a);
             if (Object.keys(responseJson.data._onGoingTechServiceList).length==0) {
              this.setState({ otpshow: 'yes' })
            }
            else {
              Toast.show('Another service is running ,Please check ongoing tab')
            }
            })
            .catch((error) => console.log(error)
               )  
    

  }
  onclickNavigate=()=>{
  
    AsyncStorage.getItem('stepssss').then(values=>{
      if(values==null){
        let that=this
        Alert.alert(
          'Confirmation',
          'Navigate to Service Location?',
          [
            { text: 'Yes', onPress: this.onclickYes },
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            
          ],
          { cancelable: false }
        );
      
      }
      else{
        //AsyncStorage.removeItem('stepssss')
//Toast.show('hi')
      }})
   
   
   
 
  
  }
 

  onclickconfirmationbutton=()=>{
       
    this.setState({show:true,startservice:true})
    AsyncStorage.setItem('confirmss',JSON.stringify(this.props.data.orderId));

  }
  onclickYes=()=>{
    AsyncStorage.setItem('stepssss',JSON.stringify(this.props.data.orderId));
   fetch('http://webapi.ilajservices.com/api/Technician/NavigateTechnician', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId: "sadsadsadsd",
                userId: this.props.userId,
                serviceId: this.props.data.serviceId,
                orderId: this.props.data.orderId,
      
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
             
             this.setState({checklisttitle:responseJson.data.checkListTitle})
             
             if (responseJson.data.checkList==null) {
              this.setState({show:true,startservice:true})
              // this.setState({show:true})
              //   this.setState({stepname:false,startservice:true,disabledbutton:false}) 
              
                      
             }
             
             else{
               responseJson.data.checkList.map((item)=>{
                this.state.checkList.push(item)
               
               })
                  this.setState({show:false})
            }
            })
            .catch((error) => console.log(error)
               )  
            
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          {this.state.otpshow==='No'? this.state.show &&
            <View style={styles.card}>
                  <View style={{flex:1,flexDirection:'row'}}>    
                    <Image source={require('../assets/group_755.png')} style={{height:22,width:22,marginTop:20}}/>
                      {this.getOverdueStatus(this.props.data.serviceDateTime)=='OD'?
                      // {this.getOverdueStatus("2020-05-01 09:38 PM")==='OD'?
                        <Text style={{fontSize:12,fontFamily:'cerapro-med',color:'red',marginTop:20,marginLeft:50}}>Service Overdue</Text>
                      :
                        <Text style={{fontSize:12,fontFamily:'cerapro-med',color:'#000000',marginTop:20,marginLeft:30}}>{this.getOverdueStatus(this.props.data.serviceDateTime)}</Text>
                        //  <Text style={{fontSize:12,fontFamily:'cerapro-med',color:'#000000',marginTop:20,paddingLeft:20}}>{this.getOverdueStatus("2020-05-01 09:38 PM")}</Text>
                      }
                      <TouchableOpacity onPress={()=>{this.DialCustomer(this.props.data.customerMobile)}}>
                        <Image style={{marginRight:0,height:22,width:22,marginTop:18,alignItems:'flex-end',marginLeft:42}} source={require('../assets/call_24_px.png')}/></TouchableOpacity>
                </View>

              <View style={styles.servicename}>
                <Text style={styles.textinBlack}>{this.props.data.serviceName}</Text>
                <Text style={styles.textinOrange}>{this.state.datetime} {this.state.time}{this.state.mode}</Text>
              </View>
              <View style={{ marginTop: 15 }}>
                <Text style={styles.textinBlack} >Service Description</Text>
                <Text style={styles.textinOrange}>{this.state.serviceDescription}</Text>
                <Text style={[styles.textinBlack, styles.margin15]} >{this.props.data.natureOfWorkHeading}</Text>
                <Text style={styles.textinOrange}>{this.props.data.natureOfWork}</Text>
              </View>
              <View>
              <Text style={[styles.textinBlack, styles.margin15]}>Address</Text>
                <Text style={styles.textinOrange}>{this.props.data.serviceAddress}
                </Text>
              </View>
              <View style={styles.row}>
                <View >
                  <Text style={styles.textinBlack}>Customer Name</Text>
                  <Text style={styles.textinOrange}>{this.props.data.customerName}</Text>
                </View>
                <View style={styles.setRightEnd}>
                  <Text style={[styles.textinBlack]}>OrderID</Text>
                  <Text style={[styles.textinOrange]}>{this.props.data.orderId}</Text>
                </View>
              </View>
              <View style={styles.row}></View>

            
                    {this.state.startservice?<>
             {  (this.checkServiceValidity(moment(),this.props.data.serviceDateTime)) === "Start" ?
                <View style={styles.buttoncenter}>
                    <TouchableOpacity onPress={this.Startservicevalidation} >
                      <View style={styles.buttongreen}>
                        <Text style={styles.buttontext}>Start Service</Text>
                      </View>
                    </TouchableOpacity>
                    </View>:<View style={styles.buttoncenter}>
                    <TouchableOpacity style={{opacity:0.5}} onPress={this.Startservicevalidation} >
                      <View style={styles.button}>
                        <Text style={styles.buttontext}>Start Service </Text>
                      </View>
                    </TouchableOpacity>
                    </View>}
</>:<View style={styles.buttoncenter}>
               
               <Button title='Navigate to Service Location' onPress={this.onclickNavigate} color='#ff453a'/>
                     </View>
                } 

            </View>:<View style={styles.card}>
                  <View style={[styles.row,{marginTop:30}]}>
                      <Text style={[styles.textinBlack,{marginLeft:30}]}>OrderID</Text>
                      <Text style={[styles.textinBlack,{marginRight:30}]}>{this.props.data.orderId}</Text>
                  </View>
                  <View style={[styles.row,{marginTop:30}]}>
                    <Text style={[styles.textinBlack,{marginLeft:30}]}>Enter OTP</Text>
                    <TextInput
                      onChangeText={text =>{this.changehandler(text)} }
                      style={[styles.textInput,{marginRight:30}]}>
                    </TextInput>
                  </View>
                  <View style={{alignItems:'center', margin:30}}>
                      <Text style={[styles.textinOrange]}>{this.state.otperror}</Text>
                  </View>
                  <View style={styles.buttoncenter}>
                    <TouchableOpacity onPress={this.onStartservice} >
                      <View style={styles.button}>
                        <Text style={styles.buttontext}>Submit</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ padding: 5 }}></View>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={()=>{this.setState({otpshow:'No'})}}>
                      <View style={styles.buttondecline}>
                        <Text style={styles.declinebuttontext}>Cancel</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              </View>}

{!this.state.show&&
  <View style={styles.card}>
                  <View style={{marginTop:10}}>
<Text style={[styles.textinOrange]}>{this.state.checklisttitle}</Text>
                      
                  </View>
                  
                <FlatList
          data={this.state.checkList}
         initialNumToRender={3}
         
          renderItem={({ item, index }) => (
         
            <View style={{flexDirection:'row',padding:10}}>
            <Icon name="dot-single" size={30} color="#ff453a" />
            <Text style={[styles.textinBlack,{marginRight:10,marginTop:7}]}>{item}</Text>
            </View>
           
          )}
         
        />
          
              <View style={styles.buttoncenter}>
                    <TouchableOpacity onPress={this.onclickconfirmationbutton} >
                      <View style={styles.button}> 
                        <Text style={styles.buttontext}>Yes I Have</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ padding: 5 }}></View>
                   
                  </View>
                 
              </View>}
           
        </View>
      </View>
    )
  }
}
// class Checklist extends React.Component{
//   render(){
//     return(
//       <View style={{flexDirection:'row',padding:15}}>
//         <Icon name="dot-single" size={30} color="#ff453a" />
//         <Text style={[styles.textinBlack,{marginRight:10}]}>{this.props.item}</Text>
//         </View>
//     )
//   }
// }
export default class Accepted extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      check: false,
      visible: true,
      ongoing: []
    }
    //this.Ongoinglist=this.Ongoinglist.bind(this)
  }
  onEndserviceclick() {

    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId: "asdsadsdasdsdsdsad",
        userId: this.props.userid,
      })
    })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.success === 'true') {
          var b = responseJson.data._newTechServiceList
          var ar = Object.values(b);
          //  var a=responseJson.data._onGoingTechServiceList
          //  a=Object.assign(ar, a) 
          //  var array = Object.values(a);
          this.setState({ data: ar })
          this.forceUpdate();
        }

      })
      .catch(error => console.log(error))
  }
  componentDidMount() {

    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId: "asdsadsdasdsdsdsad",
        userId: this.props.userid,
      })
    })
      .then(response => response.json())
      .then((responseJson) => {
        if (responseJson.success === 'true') {
          this.setState({ visible: false })
          let a = responseJson.data._onGoingTechServiceList

          var array = Object.values(a);
          this.setState({ ongoing: array })
          var b = responseJson.data._newTechServiceList
          var ar = Object.values(b);
          const Accepted = ar.filter((item) => {
            return item.serviceStatus === 'You have accepted.'
          })
          this.setState({ data: Accepted })
          //console.log(Accepted)
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {
          this.state.visible &&
          <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
            <View style={{
              paddingLeft: 18,
              height: 50,
              width: 50,
              marginTop: 20,
              paddingTop: 10,
              paddingRight: 18,
              paddingBottom: 10,
              borderWidth: 1,
              borderColor: "#e5e5e5",
              backgroundColor: '#f8f8f8',
              borderRadius: 4
            }}>
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
          renderItem={({ item, index }) => (
           
            <AcceptedView navigation={this.props.navigation} datasend={this.state.data} onEndservice={this.onEndserviceclick.bind(this)} data={item} key={item.orderId} ongoingdata={this.state.ongoing} userId={this.props.userid} Ongoing={this.props.Ongoing}
            ></AcceptedView>
           
          )}
          keyExtractor={item => item.orderId}
        />
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    width: "84%",
    flex: 1,
    marginTop: 30,
    marginLeft: 30,
  },
  card: {
    paddingLeft: 18,
    paddingTop: 0.5,
    paddingRight: 18,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: '#f8f8f8',
    borderRadius: 4
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  setRightEnd: {
    alignItems: 'flex-end', marginRight: 1
  },
  servicename: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  textinOrange: {
    color: "#ff453a",
    fontSize: 12, fontFamily: 'Cera Pro Medium',
    lineHeight: 15,
    marginTop: 3
  },
  textinBlack: {
    color: "#262626",
    fontSize: 12, fontFamily: 'Cera Pro Medium',
    lineHeight: 15,
    marginTop: 5
  },
  margin15: {
    marginTop: 15
  },
  cardcash: {
    height: 213, width: 305,
    borderWidth: 1, borderColor: "#e5e5e5", backgroundColor: '#f8f8f8'
    , borderRadius: 4, marginLeft: 10
  },
  textInput: {
    padding: 10, 
    backgroundColor: '#f8f8f8', 
    color: '#434343', 
    fontFamily: 'Cera Pro Medium', 
    fontSize: 14, 
    height: 40, 
    width: '40%', 
    borderColor: '#e5e5e5', 
    borderWidth: 1, 
    marginLeft: 6, 
 
  },
  servicenametitle: {
    color: "#262626", fontSize: 12, fontFamily: 'Cera Pro Medium'
  },
  servicedate: {
    color: "#ff453a", fontSize: 12, fontFamily: 'Cera Pro Medium'
  },
  servicedescription: {
    color: "#262626", fontSize: 12, fontFamily: 'Cera Pro Medium'
  },
  servicedesitem: {
    fontSize: 12, color: "#ff453a", fontFamily: 'Cera Pro Medium'
  },
  natureofwork: {
    fontSize: 12, color: "#262626", fontFamily: 'Cera Pro Medium'
  },
  natureofworkitem: {
    color: "#ff453a", fontSize: 12, fontFamily: 'Cera Pro Medium'
  },
  address: {
    color: "#434343", fontFamily: 'Cera Pro Medium'
  },
  addressitem: {
    color: "#ff453a", fontSize: 12, fontFamily: 'Cera Pro Medium'
  },
  customername: {
    color: "#000000", fontSize: 12, fontFamily: 'Cera Pro Medium'
  },
  customernameitem: {
    fontSize: 12, color: "#ff453a", fontFamily: 'Cera Pro Medium'
  },
  textcolor: {
    color: "red", fontFamily: 'Cera Pro Medium'
  },

  viewspacing: {
    padding: 10
  },

  textbold: {
    fontWeight: "100", fontFamily: 'Cera Pro Medium'
  },
  textsize: {
    fontSize: 20,
  },
  textcenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttoncenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    // marginBottom: 30,
    width: 133,
    alignItems: "center",
    backgroundColor: "#ff453a",
    borderRadius: 4, height: 39
  },
  buttongreen: {
    // marginBottom: 30,
    width: 133,
    alignItems: "center",
    backgroundColor: "#87CA29",
    borderRadius: 4, height: 39
  },
  buttonendservice: {
    marginTop: 20,
    width: 133,
    alignItems: "center",
    backgroundColor: "#ff453a",
    borderRadius: 4, height: 39
  },
  buttontext: {
    textAlign: "center",
    padding: 10,
    color: "white", fontSize: 10, fontFamily:'Cera Pro Medium'
  },
  buttondecline: {
    //marginBottom: 30,
    width: 110,
    alignItems: "center",
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 4, height: 39,

  },
  declinebuttontext: {
    textAlign: "center",
    padding: 10,
    fontSize: 10,
    color: "#434343", lineHeight: 13, fontFamily: 'Cera Pro Medium'
  },

})
