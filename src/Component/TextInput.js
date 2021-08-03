import React, { memo } from 'react';
import { View, StyleSheet, Text,TextInput as Input } from 'react-native';
import { theme } from '../Core/theme';

const TextInput = ({ errorText, ...props }) => (
  
  <View style={styles.container}>
    <Input
      style={styles.input}
      placeholderTextColor='#434343'
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    borderRadius:4,
    width: 257,
  height: 53,
  borderColor:'#e5e5e5',
  borderStyle:'solid',
  fontFamily:'cerapro-bold',
  borderWidth:1,
  backgroundColor: '#f8f8f8',
  paddingLeft:20,
  letterSpacing:1,
  color:'#434343'

  },
  error: {
    fontSize: 10,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
    fontFamily:'cerapro-med'
  },
  placeholdertext:{
    width:91,
    height:15,
    fontSize:12,
    fontWeight:'bold',
    fontStyle:'normal',
    lineHeight:1.25,
    letterSpacing:2,
    textAlign:"left",
    color:'#434343',
    fontFamily:'cerapro-bold'
  }
});

export default memo(TextInput);