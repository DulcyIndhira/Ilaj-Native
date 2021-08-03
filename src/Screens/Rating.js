import React from 'react';
import { Text, View, StyleSheet,FlatList} from 'react-native';
import RatingRed from './RatingRed';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import Toast from 'react-native-simple-toast';
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   });
// };
import {
  MaterialIndicator,
 } from 'react-native-indicators';
 
class FeedbackRating extends React.Component {
  constructor() {
    super();
    this.state = {
      dataloading: false,
      Id:''
    }
  }
  componentDidMount() {
  
    // if (!this.state.dataloading) {
    //   return (
    //     <AppLoading
    //       startAsync={fetchFonts}
    //       onFinish={() => this.setState({ dataloading: true })} />
    //   );
    // }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card} >
            <View style={styles.rowSet}>
              <View >
                <Text style={styles.greyLLabel} >Service</Text>
    <Text style={styles.redLData}>{this.props.data.serviceName}</Text>
              </View>
              <View>
                <Text style={styles.blackRLabel}>Customer name</Text>
                <Text style={styles.redRData}>{this.props.data.customerName}</Text>
              </View>
            </View>
            <View style={[styles.rowSet,{marginTop:15}]}>
              <View >
                <Text style={styles.greyLLabel} >Date</Text>
                <Text style={styles.redLData}>{this.props.data.feedbackDate}</Text>
              </View>
              <View>
                  <Text style={styles.blackRLabel}>Order ID</Text>
                  <Text style={styles.redRData}>{this.props.data.orderId}</Text>
              </View>
            </View>
            <View style={[styles.rowSet,{marginTop:15}]}>
                <Text style={styles.greyLLabel}>Rating</Text>
            </View>
                <View style={{height:25, width:'60%'}}><RatingRed  rate={this.props.data.ratings}/>
            </View>
            <View  style={{marginTop:15}}>
              <Text style={styles.greyLLabel,{marginTop:15}}>Feedback</Text>
              <View >
                <Text style={styles.redLData}>{this.props.data.customerComment}</Text>
              
              </View>
            </View>
        </View>
      </View>
    )
  }
}
export default class Feedback extends React.Component{
  constructor(props){
    super(props);
    this.state={
      visible:true,
      data:[],
      Id:''
    }
  }
  componentDidMount(){
    const {state} =this.props.navigation;
   this.setState({Id:state.params.userId})
 
    fetch('http://webapi.ilajservices.com/api/Technician/getCustomerFeedback', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devId:"asd",
          userId: state.params.userId
        })
      })
      .then(response => response.json())
              .then((responseJson) => {
                console.log('feedback',responseJson)
                let a=responseJson.data.customerFeedback
                var array = Object.values(a);
                this.setState({visible:false})
             
                this.setState({data:array})
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
       </View>
       :

        <FlatList
        data={this.state.data}
        initialNumToRender={10}
        renderItem={({ item,index }) => (

        <FeedbackRating navigation={this.props.navigation}  data={item} key={index} ></FeedbackRating>
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
    marginTop: 26,
    alignSelf: "center"
  },
  card: {
    paddingLeft: 18,
    paddingTop: 18,
    paddingRight: 18,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
},
rowSet: {
  flexDirection: "row",
  justifyContent: "space-between",
  fontFamily: 'cerapro-med',
},
blackRLabel: {
  color: "#000000", 
  fontFamily: 'cerapro-med', 
  fontSize: 12, 
  lineHeight: 15, 
  fontWeight: "500"
},
greyLLabel: {
  color: "#262626", 
  fontFamily: 'cerapro-med', 
  fontSize: 12, 
  lineHeight: 15, 
  fontWeight: "500"
},
redLData:{
  color: "#262626", 
  fontFamily: 'cerapro-med', 
  fontSize: 12, 
  lineHeight: 15, 
  color: "#ff453a", 
  fontWeight: "500", 
  lineHeight: 15, 
},
redRData: {
  color: "#262626", 
  fontFamily: 'cerapro-med', 
  fontSize: 12, 
  lineHeight: 15, 
  color: "#ff453a", 
  fontWeight: "500", 
  lineHeight: 15, 
  paddingLeft: 16
},
topMargin: {
  marginTop: 20
}
})


// export default class  Feedback extends React.Component{
//   constructor(props){
//     super(props)
//     this.state={
//      // data:this.props.data
//     }
//   }
//   componentDidMount(){
//    // console.log("kkk",this.state.data)
//   }
//   render(){
//       return(
//         <View style={{flex:1}}>
//          <FlatList
//         data={this.state.data}
//         renderItem={({ item,i }) => (
//           <FeedbackView
//           item={item}   key={i}
//           />
//         )}
//         keyExtractor={item => item.serviceId}
//       />
//         </View>
//       )
//   }
// }