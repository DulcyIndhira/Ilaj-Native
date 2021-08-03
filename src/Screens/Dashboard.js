import React from 'react';
import {AsyncStorage,View,BackHandler} from 'react-native';
import TabsViewExample from './TabsView';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
let serviceId=''
let orderid=''
let datetime=''
let userId=''
let userName=''
let userTypeId=''
export default class DashBoard extends React.Component{
constructor(props){
  super(props);
  this.state={
    data:{},showFeedbackForm:false,
   userId:'',
    dataid:{},
    userserviceid:'',
    Name:'',
    tabchange:''
  }
}

  componentDidMount(){
    this.backButton = BackHandler.addEventListener('hardwareBackPress', () =>{
      BackHandler.exitApp()
      return true;
      });
 
      AsyncStorage.getItem('UserId').then(value => {
        if (value == null) {
          this.props.navigation.navigate('LoginScreen', {
            login: true,
          })
        } else {
          this.setState({ userserviceid: (JSON.parse(value)) })
        }
      }
      );
      AsyncStorage.getItem('UserName').then(value => {
        if (value == null) {
          this.props.navigation.navigate('LoginScreen', {
            login: true,
          })
        } else {
          this.setState({ Name: value })
        }
      }
      );
     
    const {state} =this.props.navigation;
    userId=state.params.userId;
    userName=state.params.userName;
    userTypeId=state.params.usertypeid
    var params=state.params.changeTab==''?0:state.params.changeTab
    this.setState({tabchange:params})
    console.log('tab',this.state.tabchange)
    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId:'asdsadsdasdsdsdsad',
        userId:state.params.usertypeid,
      
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
             this.setState({data:responseJson.data})
             responseJson.data._newTechServiceList.map((item)=>{
              datetime=item.serviceDateTime
             serviceId=item.serviceId
             orderid=item.orderId
            })
             this.setState({serviceId:responseJson.data.serviceId}) 
      this.setState({orderid:responseJson.data.orderid})
      console.log(responseJson)     
      this.forceUpdate() 
            })
            .catch(error => console.log(error)) 
            
  }
  componentWillUnmount(){
    this.backButton.remove();
    }
    
  onStartService(){
    const {state} =this.props.navigation;
    usertypeid=state.params.usertypeid;
    userName=state.params.userName
    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId:'asdsadsdasdsdsdsad',
        userId:state.params.usertypeid,
      
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
             this.setState({data:responseJson.data})
             responseJson.data._newTechServiceList.map((item)=>{
              datetime=item.serviceDateTime
             serviceId=item.serviceId
             orderid=item.orderId
            })
             this.setState({serviceId:responseJson.data.serviceId}) 
      this.setState({orderid:responseJson.data.orderid})
             this.forceUpdate() 
            })
            .catch(error => console.log(error)) 
  }
onDecline(){
  const {state} =this.props.navigation;
    userId=state.params.userId;
   
    userTypeId=state.params.usertypeid

  this.props.navigation.navigate('DeclineScreen',{
    userId:userTypeId,
    serviceId:serviceId,
    orderid:orderid,
  })
}

onFeedbackSubmit(){
  this.setState({showFeedbackForm:true})
}
 render(){
  // const {state} =this.props.navigation;
  // userTypeId=state.params.usertypeid;
        return(
          <View  style={{flex:1,marginTop:18,backgroundColor:"#f8f8f8"}}>
          <View style={{flex:1}}>
             <View style={{ flex: 1 }}>
                <HeaderView id={userId} userId={userTypeId} userName={userName} pageTitle={"MY SERVICES"} /> 
            </View>
            
            <View style={{ flex:6,marginTop:34}}>
                <TabsViewExample data={this.state.data} navigation={this.props.navigation} userId={userTypeId} onStartService={this.onStartService.bind(this)} userName={userName} onDecline={this.onDecline.bind(this)} datetime={datetime} tabchange={this.state.tabchange} />
            </View>
         
            <View style={{ marginBottom:5,bottom:0,left:2,right:13,opacity :1,}}>
                <FooterView  feedback='feedbackformdashboard' myservice='service2' id={userId} userName={userName} userTypeId={userTypeId} onFeedbackSubmit={this.onFeedbackSubmit.bind(this)} navigation={this.props.navigation}/>
            </View>
         </View>

        </View>
        )
    }    
} 
