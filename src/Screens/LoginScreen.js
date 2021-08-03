import React, { memo, useState } from 'react';
import { TouchableOpacity,AsyncStorage,Dimensions, StyleSheet,Image, Text, View ,ScrollView} from 'react-native';
import Background from '../Component/Background';
import TextInput from '../Component/TextInput';
import { theme } from '../Core/theme';
import Toast from 'react-native-simple-toast';
import { emailValidator, passwordValidator } from '../Core/util';
// import * as Font from 'expo-font';
// import { AppLoading } from 'expo';


// const screenWidth = Math.round(Dimensions.get('window').width-130); 
// const screenHeight = Math.round(Dimensions.get('window').height-480); 
const heightmargin=Dimensions.get('window').height
// const fetchFonts = () => {
//   return Font.loadAsync({
//     'cerapro-bold': require('../../assets/fonts/CeraPro-Bold.ttf'),
//     'cerapro-med': require('../../assets/fonts/CeraPro-Medium.ttf')
//   });
//   };
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
const [dataloaded, setdataloaded] = useState(false);
const[userId,setuserId]=useState('');
const[UserName,setuserName]=useState('');
const[usertypeid,setusertypeid]=useState('');

// if(!dataloaded){
//   return(
//   <AppLoading
//   startAsync={fetchFonts}
//   onFinish={()=>setdataloaded({dataloaded:true})}/>
//   );
// }
  AsyncStorage.getItem('UserId').then(value =>
    //AsyncStorage returns a promise so adding a callback to get the value
    setuserId(JSON.parse(value))
    //Setting the value in Text 
  );
  AsyncStorage.getItem('UserName').then(value =>
    //AsyncStorage returns a promise so adding a callback to get the value
    setuserName(value)
    //Setting the value in Text 
  );
  AsyncStorage.getItem('UserTypeId').then(value =>
    //AsyncStorage returns a promise so adding a callback to get the value
    setusertypeid(JSON.parse(value))
    //Setting the value in Text 
  );
  if(userId==null||usertypeid==null||UserName==null||UserName==undefined||userId==undefined||usertypeid==undefined||UserName==''||userId==''||usertypeid==''){

    
  }
  else{
    if(usertypeid!='' && UserName!=''&&userId!=''){
      navigation.navigate('Dashboard',{
        usertypeid: usertypeid,
        userName:UserName,
        userId:userId
        
      })
    }
  }

    const _onLoginPressed = (event) => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
else{

  fetch('http://webapi.ilajservices.com/api/Technician/loginCheck', {
    method: 'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      devId:'asdsadsadsad',
      userName:email.value,
      UserPass:password.value,
    })
  })
  .then(response => response.json())
          .then((responseJson) => {
             if(responseJson.success==='true'){
              AsyncStorage.setItem('UserId',JSON.stringify(responseJson.data.emirateID));
              AsyncStorage.setItem('UserName',responseJson.data.userName);
              AsyncStorage.setItem('UserTypeId',JSON.stringify(responseJson.data.userId));

              navigation.navigate('Dashboard',{
                userId: responseJson.data.emirateID,
                userName:responseJson.data.userName,
                usertypeid:responseJson.data.userId
                
              })
              console.log(responseJson)
              setEmail({value: '', error: '' }),setPassword({value: '', error: '' })
            }
              else{
                Toast.show('login failed');
                setEmail({value: '', error: '' }),setPassword({value: '', error: '' })
              }
          })
          .catch(error => console.log(error))
    }
  }
 
  return (
    <ScrollView  style={{flex:1}}>
      <View style={styles.viewstyle}>
          <Image
            source={require('../assets/Ilaj.png')}
            style={styles.ImageStyle}
          />
          <Text style={styles.pageTitle}>Service Technician Login</Text>
      </View>
       
      <View style={{flex:4, alignSelf:"center"}}>
    <Background>
    <View style={{alignItems:'center'}}>
    <View style={styles.inputBaseM}>
      <TextInput
         placeholder="Mobile/Email ID"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        keyboardType="email-address"
      />
</View>

    <View style={styles.inputBaseM}>
      <TextInput
        placeholder="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
    </View>
      </View>
        <View style={styles.inputBaseR}>
      <TouchableOpacity style={styles.Buttonstyle} onPress={_onLoginPressed} activeOpacity={0.5}>
      <Text style={styles.titletextstyle}>Login</Text>
         <Image
            source={require('../assets/Path192.png')}
            style={styles.ImageIconStyle}
          />
    </TouchableOpacity>
    </View>
        <View style={[styles.forgotpassBase]}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={[styles.label,{marginRight:1}]}>Forgot password?</Text>
          </TouchableOpacity>
    </View>
    </Background>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  forgotpassBase: {
    alignSelf:"flex-end",
    marginRight:20,
    width: "100%"
    
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: '#434343',
    marginTop:20,
    fontFamily:'cerapro-med',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    fontFamily:'cerapro-med'
  },
  inputBaseM:{
    width: '100%',
    paddingLeft:25,
    alignContent:'center',
    alignItems:'center',
    paddingRight:25,
    fontFamily:'cerapro-bold'
      },
  Buttonstyle:{
    width: 218,
    height: 39,
    borderRadius: 4,
    backgroundColor: '#ff453a',
    flexDirection:'row',
    marginTop:15,
    fontFamily:'cerapro-med',
    marginLeft:heightmargin*0.05
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
    marginTop:2
    
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
  }
});

export default memo(LoginScreen);