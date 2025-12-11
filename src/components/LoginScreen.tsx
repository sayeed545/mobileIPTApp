import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Alert, Button, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Image, StatusBar, PermissionsAndroid } from "react-native";
import {useNavigation} from '@react-navigation/native';
const  DEVICE_HEIGHT = Dimensions.get('window').height
const  DEVICE_WIDTH = Dimensions.get('window').width
import { useSelector } from 'react-redux'
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from "../redux/store/store";
import { loginDetails, updateLoginDetails } from "../redux/user.action";
import { Color } from "../theme";

import PushNotification, { Importance } from 'react-native-push-notification';


const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [username, setUsernameText] = useState<string>("");
  const [password, setPasswordText] = useState<string>("");
  //const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  const userDetails = useSelector((state: RootState) => state.user.details);
  const dispatch = useAppDispatch();
  
  // const checkLogin = async () => {
  //   console.log("i am here");
  //   try{

    
  //   const response = await fetch('http://64.126.41.240:5010/api/userProfiles/login', {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
        
  //         "userName":"LEG123",
  //         "userType":"Mobile",
  //         "password":"leg123"
      
  //     }),
  //   });
    

  //   const data = await response.json();
  //   console.log("data:::::",data);
  // } catch (error) {
  //     console.error('Error fetching data:', error);
  //     Alert.alert('Error', 'Failed to fetch data. Please try again.');
  //   }
  // }

  useEffect( () => {
    // checkLogin();
    // if(userDetails && userDetails.patientId )
    //   {
    //     navigation.navigate('Home')
    //   }
    PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
);
    PushNotification.createChannel(
  {
    channelId: "reminders",
    channelName: "Reminders",
    importance: 4,
    vibrate: true,
  },
  (created: any) => console.log("Channel created:", created)
);
// setTimeout(() => {
//  console.log("Scheduling notification...");

//     PushNotification.localNotificationSchedule({
//       channelId: "reminders",
//       message: "Testing...",
//       date: new Date(Date.now() + 3000),
//     });
// }, 2000);
    
  }, [])
  const onChangeUsernameText = (text: string) => {
    setUsernameText(text);
  };
  const onChangePasswordText = (text: string) => {
    // let filterText = text.replace(/[^0-9A-Za-z.-/-—… ]/g, '');
    // if (filterText === ' ') filterText = '';
    setPasswordText(text);
  };
  const onDonePressed = async () => {
    // if(!emailRegex.test(username))
    //   {
    //     Alert.alert('Please Enter Valid Email')
    //     return;
    //   }
    // navigation.navigate('ChangePassword')
    // return;
    if(username?.length === 0)
    {
      Alert.alert('','Please Enter Username')
    }
    else if(password?.length === 0)
    {
      Alert.alert('','Please Enter Password')
    }
    else
    {
      let params = {
        "userName":username,
        "userType":"Mobile",
        "password":password
    };
      const eDetails = await dispatch(loginDetails(params));
      console.log("loginDetails::::",eDetails.payload);
      if (eDetails.payload) {
        await dispatch(updateLoginDetails(eDetails.payload));
        navigation.navigate('Home')
      }
      else
      {
        Alert.alert('Check your Login Details');
      }
    }
   
    
  };
  const scheduleNotification = () => {
    console.log("Triggering local notification...");

    PushNotification.localNotificationSchedule({
      channelId: "reminders",
      message: "This is a test notification",
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle: false,
      exact: false,
    });
  };
    return (
      <ImageBackground
        //source={require('../images/imageBG.png')}
         style={{
          backgroundColor:Color.bgColor,
        justifyContent: 'flex-start',
        height:DEVICE_HEIGHT,

      }}>
        <SafeAreaView style={[styles.container, styles.horizontal]}>
        <KeyboardAvoidingView
         behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
         >
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
            {/* <Text style={styles.title}>
                OTSI
            </Text> */}
             <Image 
                source={require('../images/iptlogo.png')}  
                resizeMode="center"
                style={{width: DEVICE_WIDTH-20, height: 220,marginBottom:20 }}
            />
            {/* <Text style={styles.subTitle}>
                Employee Portal
            </Text> */}
            
            <View style={{margin:10,paddingBottom:15}}>
            <View style={{width:'100%',height:'100%',position:'absolute',backgroundColor:'lightgray',borderRadius:10,opacity:0.6}}></View>
            <View style={{padding:10,borderRadius:10}}>
              <Text style={{fontSize:20,fontWeight:500, color:Color.logoBlue}}> Username</Text>
                <TextInput style={{backgroundColor:'#fff',marginTop:10,borderColor:'lightgray',borderWidth:1,height:44,fontSize:18,paddingLeft:5,borderRadius:5}}
                    placeholder='Enter username'
                    value={username}
                    //maxLength={5}
                    onChangeText={onChangeUsernameText}
                    autoCorrect={false}
                />
                <Text style={{fontSize:20,fontWeight:500,marginTop:20, color:Color.logoBlue}}> Password</Text>
                <TextInput style={{backgroundColor:'#fff',marginTop:10,borderColor:'lightgray',borderWidth:1,height:44,fontSize:18,paddingLeft:5,borderRadius:5,marginBottom:15}}
                    placeholder='Enter Password'
                    value={password}
                    secureTextEntry
                    onChangeText={onChangePasswordText}
                    autoCorrect={false}
                />
            </View>
           <View style={{marginBottom:10}}>
             <Button title="Schedule Notification" onPress={scheduleNotification} />
           <TouchableOpacity onPress={onDonePressed} 
           style={{backgroundColor:'#36648F',width:'60%',height:50,alignItems:'center',justifyContent:'center',alignSelf:'center',borderRadius:5,marginBottom:10}}>
              <Text style={{color:'#fff',fontSize:22,fontWeight:600}}>Login</Text>
          </TouchableOpacity>
        
           </View>
           </View> 
           </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      padding: 10,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize:50
      },
      subTitle: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize:40,
        fontWeight:'700',
        marginBottom:50,
        color:Color.logoBlue5
      },
  });

export default LoginScreen;