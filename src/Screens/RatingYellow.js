import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-simple-toast';

// const fetchFonts = () => {
//   return Font.loadAsync({
//   'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf')
//   });
//   };
export default class RatingYellow extends React.Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 0,
      Max_Rating: 5,
      review:'',
      dataloading:false

    };
  }
  componentDidMount(){
    const {state} =this.props.navigation;
   
 
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
              let a=responseJson.data.reviews
              let b=responseJson.data.ratings
              this.setState({review:a})
              this.setState({Default_Rating:b})
            })
            .catch((error) => {console.log(error)
              this.setState({visible:false})
            
              Toast.show('Something went wrong')}
                )  
    //console.log(this.props.item)
  //   if(!this.state.dataloading){
  //    return(
  //      <AppLoading
  //      startAsync={fetchFonts}
  //      onFinish={()=>this.setState({dataloading:true})}/>
  //    );
  //  }
  }
  // UpdateRating(key) {
  //   this.setState({ Default_Rating: key });
  // }
  render() {
    // let React_Native_Rating_Bar = [];
    // for (var i = 1; i <= this.state.Max_Rating; i++) {
    //   React_Native_Rating_Bar.push(
    //     <View style={{padding:4}}>
    //     {/* <TouchableOpacity
    //       activeOpacity={0.7}
    //       key={i}
    //       onPress={this.UpdateRating.bind(this, i)}> */}
    //       <Image
    //         style={styles.StarImage}
    //         source={
    //           i <= this.state.Default_Rating
    //             ?  require('../assets/Yellow.png') 
    //             :  require('../assets/YellowWhite.png') 
    //         }
    //       />
    //     {/* </TouchableOpacity> */}
    //     </View>
    //   );
    // }
    
    return (
      <View style={styles.MainContainer}>      
        <View style={styles.childView}>  
        <StarRating
        disabled={true}
        starSize={20}
        maxStars={5}
        rating={this.state.Default_Rating}
        fullStarColor={'#ffd60a'}
        halfStarColor={'#ffd60a'}
        emptyStarColor={'#e4e4e4'}
        starStyle={{marginLeft:10}}
      />
     
      </View>
        <View style={styles.childView}>
        <Text style={{marginRight:20,color:'#5c5c5c',fontFamily:'cerapro-med',fontSize:15}}>  {this.state.review}  Reviews</Text>
        {/* <Text style={{marginRight:20,color:'#5c5c5c',fontFamily:'cerapro-med',fontSize:15}}>  12345 Reviews</Text> */}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-evenly',
  },
  childView: {
    flexDirection: 'row',
    fontFamily:'cerapro-med',
    marginRight:60,
  
  },

  StarImage: {
    width: 17,
    height: 16,
    resizeMode: 'cover',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginTop: 15,
  },
});