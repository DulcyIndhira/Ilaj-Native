import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import New from './New';
import Ongoing from './Ongoing';
import Accepted from './Accepted';
import Completed from './Completed';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cera-pro': require('../../assets/fonts/CeraPro-Medium.ttf'),
//   'cerapro-bold': require('../../assets/fonts/CeraPro-Bold.ttf'),

//   });
//   };
export default class TabsView extends React.Component{
  constructor(props){
    super(props)
    this.state={
      newRoute:true,
      ongoingRoute:false,
      CompletedRoute:false,
      AcceptedRoute:false,
      dataloaded:false
    }
  }
  componentDidMount(){
    this.setState({newRoute:true})

    
    // if(!this.state.dataloaded){
    //   return(
    //     <AppLoading
    //     startAsync={fetchFonts}
    //     onFinish={()=>this.setState({dataloaded:true})}/>
    //   );
    // }
   
  }
  onNewSubmit(){
    this.setState({newRoute:true,
      ongoingRoute:false,
      CompletedRoute:false,
    AcceptedRoute:false})
  }
  onOngoingSubmit(){
    this.setState({newRoute:false,
      ongoingRoute:true,
      CompletedRoute:false,
    AcceptedRoute:false})
  }
  onCompletedSubmit(){
    this.setState({newRoute:false,
      ongoingRoute:false,
      CompletedRoute:true,
      AcceptedRoute:false
    })
  }
  onAcceptedSubmit(){
    this.setState({newRoute:false,
      ongoingRoute:false,
      CompletedRoute:false,
      AcceptedRoute:true
    })
  }

  render(){
    //console.log(this.props.data)
    return(
      <View style={{marginTop:50,flex:1}}>
        <View style={styles.tabBase}>
        <TouchableOpacity onPress={this.onNewSubmit.bind(this)}>
                    <View style={styles.btn}>
                      <Text style={this.state.newRoute?styles.btnDynText:styles.btnText}>New</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onAcceptedSubmit.bind(this)}>
                    <View style={styles.btn}>
                      <Text style={this.state.AcceptedRoute?styles.btnDynText:styles.btnText}>Accepted</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onOngoingSubmit.bind(this)}>
                    <View style={styles.btn}>
                      <Text style={this.state.ongoingRoute?styles.btnDynText:styles.btnText}>Ongoing</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onCompletedSubmit.bind(this)}>
                    <View style={styles.btn}>
                      <Text style={this.state.CompletedRoute?styles.btnDynText:styles.btnText}>Completed</Text>
                    </View>
                  </TouchableOpacity>
      </View>

         {this.state.newRoute && <New  data={this.props.data._newTechServiceList} navigation={this.props.navigation} onDecline={this.props.onDecline} flag={this.props.flag} userid={this.props.userId} onStartService={this.props.onStartService} datetime={this.props.datetime} />}
         {this.state.AcceptedRoute&&<Accepted data={this.props.data._newTechServiceList} userid={this.props.userId} Ongoing={this.onOngoingSubmit.bind(this)} />}
         {this.state.ongoingRoute&&<Ongoing  data={this.props.data._onGoingTechServiceList}  userid={this.props.userId} datetime={this.props.datetime} newTab={this.onNewSubmit.bind(this)}/>}
         {this.state.CompletedRoute&& <Completed   data={this.props.data._completedTechServiceList}  userid={this.props.userId} datetime={this.props.datetime}/>}
      </View>
    )
  }
}

const styles=StyleSheet.create({
  btn: {
    alignItems: "center",
    borderRadius:4,
    height:39,
    justifyContent:'space-evenly'
  },
 btnText: {
    textAlign: "center",
    color: "#ffffff",fontWeight:"500",
    fontSize:12,
    fontFamily:'cerapro-bold',
  },
  btnDynText:{
    textAlign: "center",
     paddingBottom: 13.5,
     paddingTop: 13.5,
     color: "#ffffff",
     fontWeight:"400",
     fontSize:12,
     lineHeight:15,
     fontFamily:'cerapro-bold',
     textDecorationColor:"#ffffff",borderBottomColor:"white",
     borderBottomWidth:2
  },
  tabBase: {
    flexDirection:"row",
    justifyContent:'space-evenly', 
    backgroundColor:"#ff453a",
    padding:5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5,
  }
})