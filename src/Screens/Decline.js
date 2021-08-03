import React from 'react';
import {Text,View,BackHandler,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
//import * as Font from 'expo-font';
//import { AppLoading } from 'expo';
import Toast from 'react-native-simple-toast';
import Icons from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   'cerapro-bold': require('../../assets/fonts/CeraPro-Bold.ttf'),

//   });
//   };
export default class Decline extends React.Component{
 constructor(props){
     super(props)
     this.state={reasonotherText:'',
     reason:'',
         reasonText:'',
         dataloading:false,
         userId:'',
         serviceId:'',
         orderId:'',
         data:{}
     }
 }
    componentDidMount(){
      this.backButton = BackHandler.addEventListener('hardwareBackPress', () =>{
        this.props.navigation.navigate('Dashboard')
        return true;
        });
     
      const {state} =this.props.navigation;
      if(this.props.navigation.state==undefined){

      }else{
        this.setState({userId:state.params.userId})
        this.setState({serviceId:state.params.serviceId})
        this.setState({orderId:state.params.orderid})
      }
  
 
    //  if(!this.state.dataloading){
    //   return(
    //     <AppLoading
    //     startAsync={fetchFonts}
    //     onFinish={()=>this.setState({dataloading:true})}/>
    //   );
    // }
   
  }
  componentWillUnmount(){
    this.backButton.remove();
    }
    
  onRejectService(){
    const {state} =this.props.navigation;
    if(this.state.reasonText==''){
      this.setState({reason:this.state.reasonotherText})
    }
    else{
      this.setState({reason:this.state.reasonText})
 
    }
   fetch('http://webapi.ilajservices.com/api/Technician/acceptRejectService', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       devId:"sdadsasdjiowjiowqje",
 userId: state.params.userId,
 serviceId: state.params.serviceId,
 orderId: state.params.orderid,
 status: 1,
 rejectReason: this.state.reason
     })
   })
   .then(response => response.json())
           .then((responseJson) => {
             console.log('rejection',responseJson)

             if(responseJson.success==='true'){
              Toast.show('Your rejection has been submitted');
              this.props.navigation.navigate('Dashboard')
             }
             else{
              Toast.show('error');

             }
            //this.setState({data:responseJson.data})  
           })
           .catch(error => console.log(error))  
  }
  onDeclineClick(){  
    fetch('http://webapi.ilajservices.com/api/Technician/getServiceDetails', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        devId:"asdsadsdasdsdsdsad",
  userId:this.state.userId,
      })
    })
    .then(response => response.json())
            .then((responseJson) => {
              if(responseJson.success==='true') {
                let a=responseJson.data._newTechServiceList
                this.setState({data:a})
                this.forceUpdate();
 }
})
            .catch(error => console.log(error))
  }

  handleChange(value) {
    this.setState({
        reasonText: value
    });
}
    render(){
      const {state} =this.props.navigation;

        return(
          <ScrollView>
            <View style={{padding:40,backgroundColor:"#f8f8f8",flex:1,height:811}}>
                <View style={{}}><Text style={{fontSize:22,color:"#ff453a",lineHeight:28,fontWeight:"500",fontFamily:'cerapro-med'}}>Select Reason for</Text>
                        <Text style={{fontSize:22,fontFamily:'cerapro-med',color:"#ff453a",lineHeight:28,fontWeight:"500"}}>cancelation</Text>
        
                        </View>
                        <View style={{padding:19}}></View>
                        <View style={{borderRadius: 4,
                           borderColor:"#e5e5e5",borderWidth:1,
                           backgroundColor: "#f8f8f8"}}>
                         <RNPickerSelect
                          placeholder={{
                          label: '    SELECT',
                          value: null,
                      }}
                      placeholderTextColor="red"

                      style={{ ...pickerSelectStyles }}
                         Icon={() => {
                          return <View style={{ marginTop: 16, marginBottom: 16 ,marginRight:10}}>
                             <Icons
                          name="down"
                          size={20} color="#ff453a"
                              underlayColor="transparent"
                              iconStyle={styles.editIcon}
                          />
                          </View>
                      }}
            onValueChange={(value) =>this.setState({reasonText:value})}
            items={[
                { label: '     Busy with an existing service', value: 'Busy with an existing service',color:'#434343' },
                { label: '     I am on leave', value: 'I am on leave' ,color:'#434343'},
                { label: '     I am sick', value: 'I am sick',color:'#434343' },
                { label: '     I am on a personal emergency', value: 'I am on a personal emergency',color:'#434343' },
                { label: '     Transport not available', value: 'Transport not available',color:'#434343' },
                { label: '     I have another service scheduled', value: 'I have another service scheduled',color:'#434343' },
                { label: '     I am struck in traffic', value: 'I am struck in traffic',color:'#434343' },
                { label: '     Met with an accident', value: 'Met with an accident',color:'#434343' },
                { label: '     Others', value: 'Others',color:'#434343' },
            ]}
        />
                        
                        </View>
                        <View style={{padding:28}}></View>
                      {this.state.reasonText==='Others'&& <View style={{}}>
                          <Text style={{fontSize:20,fontFamily:'cerapro-med',color:"#ff453a",lineHeight:28}}>Other reason</Text>
                          <View style={{padding:7}}></View>
                          <TextInput multiline={true}
                            numberOfLines={12}
                            textAlignVertical = "top"
                              onChange={e=>this.setState({reasonotherText:e})}
                           style={{width:"100%",fontFamily:'cerapro-med',borderRadius: 4,
                           borderColor:"#e5e5e5",borderWidth:1,
                           backgroundColor: "#ffffff",padding:10,height:113}}
                           placeholder="Type your reason for rejection"
                           />
                        </View>}
                        <View style={{padding:25}}></View>
                        <TouchableOpacity
                         onPress={this.onRejectService.bind(this)}
                         >
                    <View style={styles.buttondecline} >
                      <Text style={styles.buttontext}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                  
                  
            </View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    buttondecline :{
        //marginBottom: 30,
        width:"100%",
        alignItems: "center",
        backgroundColor:"#ff453a",
        borderRadius:4,height:39,fontFamily:'cerapro-med',
        marginLeft:1
      },
     buttontext :{
        textAlign: "center",
         padding: 10,
         fontSize:10,
         fontFamily:'cerapro-med',
        color: "white",
        marginTop:4,
        marginRight:10
      },
      editIcon: {
        color: '#ff453a',
        fontSize: 15,
    },
})
const pickerSelectStyles = StyleSheet.create({
  placeholder: {color: '#434343'},
  inputAndroid: {
    
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 4,
    backgroundColor: '#f8f8f8',
    color: '#434343',
    
},
});