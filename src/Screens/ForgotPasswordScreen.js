import React, { memo, useState } from 'react';
import { Text,StyleSheet, Image, TouchableOpacity, View, ScrollView } from 'react-native';
import { emailValidator } from '../Core/util';
import Background from '../Component/Background';
import TextInput from '../Component/TextInput';
import { theme } from '../Core/theme';
import Toast from 'react-native-simple-toast';

// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf'),
//     'cerapro-bold': require('../../assets/fonts/CeraPro-Bold.ttf')
//   });
// };

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [dataloaded, setdataloaded] = useState(false);
  // if (!dataloaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setdataloaded(true)} />
  //   );
  // }

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    else {

      fetch('http://webapi.ilajservices.com/api/Technician/forgotPassword', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          devId: 'asdsadasdssd',
          userName: email.value,

        })
      })
        .then(response => response.json())
        .then((responseJson) => {
         // console.log(responseJson)
          if (responseJson.success === 'true') {
            Toast.show('New Password has been sent to your Email ID')
            navigation.navigate('LoginScreen')
            setEmail({ value: '', error: '' })

          }
          else {
            Toast.show('enter valid Mobile/EMail Id');
            setEmail({ value: '', error: '' })
          }
        })
        .catch(error => console.log(error))
    }



  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.viewstyle}>
          <Image
            source={require('../assets/Ilaj.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.pageTitle}>Service Technician Login</Text>
      </View>

      <View style={{ flex: 1}}>
        <Background>
          <View style={styles.inputBaseM}>
          <TextInput
            placeholder="Enter Registered Email ID"
            returnKeyType="done"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address" 
          />
        </View>
        <View style={styles.inputBaseR}>
          <TouchableOpacity style={styles.Buttonstyle} onPress={_onSendPressed} activeOpacity={0.5}>
            <Text style={styles.titletextstyle}>Send my Password</Text>
            <Image
                source={require('../assets/Path192.png')}
                style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop:40,marginLeft:165}}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.label}>← Back to login</Text>
          </TouchableOpacity>
      </View>
        </Background>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
  Buttonstyle:{
    width: 218,
    height: 39,
    borderRadius: 4,
    backgroundColor: '#ff453a',
    flexDirection:'row',
    marginTop:15,
    fontFamily:'cerapro-med'
  },
  titletextstyle:{
    width:'75%',
    fontSize:12,
    fontFamily:'cerapro-bold',
    fontStyle:'normal',
    lineHeight:25,
    flexDirection:'row',
    justifyContent:'flex-start',
    color:'#ffffff',
    marginLeft:20,
    marginTop:5
  },
  ImageIconStyle:{
    marginTop:15,
    height:9.2,
    width:14.9,
  },
  viewstyle:{
    height: 318,
    backgroundColor: '#136596',
    alignItems:"center",
    alignContent:'center',
    width:'100%'
  },
  ImageStyle:{
    marginTop:80,
  },
  pageTitle:{
    flex:1,
    alignItems:'center',
    fontSize: 24,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#ffffff',
    marginTop:28,
    fontFamily:'cerapro-med',
  },
  inputBaseR:{
    width: '100%',
    alignContent:'flex-end',
    alignItems:'flex-end',
    paddingRight:25,marginLeft:9
  },
  inputBaseM:{
    alignSelf:'center',
    fontFamily:'cerapro-med',
  },
});

export default memo(ForgotPasswordScreen);