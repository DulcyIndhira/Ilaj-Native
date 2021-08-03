import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import StarRating from 'react-native-star-rating';
export default class Rating extends React.Component {
  constructor() {
    super();
    this.state = {
      Default_Rating: 0,
      Max_Rating: 5,
    };
    
  }
  componentDidMount(){
    console.log(this.props.rate)
    this.setState({Default_Rating:this.props.rate})
  }

  render() {
  
    return (
      <View style={styles.MainContainer}>
        <View style={styles.childView}> 
        <StarRating
        disabled={true}  
        maxStars={5}
        starSize={30}
        rating={this.state.Default_Rating}
        fullStarColor={'#ff453a'}
        halfStarColor={'#ff453a'}
        emptyStarColor={'#ffbab5'}
        starStyle={{marginLeft:10}}

      /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft:0,
    marginTop:15
    //paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  childView: {
    justifyContent:'flex-start',
    flexDirection: 'row',
    //marginTop: 30,,
  },

 
//   textStyle: {
//     textAlign: 'center',
//     fontSize: 23,
//     color: '#000',
//     marginTop: 15,
//   },
//   textStyleSmall: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#000',
//     marginTop: 15,
//   },
});