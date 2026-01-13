import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, Alert, Button, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, StatusBar } from "react-native";
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { reset as resetUser} from '../redux/user.slice';
import { Color } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import notifee from '@notifee/react-native';
const  DEVICE_HEIGHT = Dimensions.get('window').height
const  DEVICE_WIDTH = Dimensions.get('window').width

const Dashboard = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [endButtonVisible, setEndButtonVisible] = useState<boolean>(false);
  const userDetails = useAppSelector((state) => state.user.details);
  const insets = useSafeAreaInsets();
  
 

 
  function logoutCalled  () {
    if(endButtonVisible)
      {
        Alert.alert('', 'Please end your work log hour and hit logout!', [
          { text: 'Ok', onPress: () =>  null},
          
        ]);
        return;
      }
    Alert.alert('', 'Are you sure you want to logout!', [
      { text: 'Yes', onPress: async () =>  {
       // dispatch(resetUser());
        navigation.goBack();
       // await notifee.cancelAllNotifications();
      }},
      { text: 'No', onPress: () => null },
    ]);
    
  };
    return (
      <ImageBackground
        //source={require('../images/imageBG.png')}
         style={{
          backgroundColor:Color.bgColor,
        justifyContent: 'flex-start',
        height:DEVICE_HEIGHT,

      }}>
        <View style={{backgroundColor:Color.barnerLogo,height:insets.top}}/>
        <View style={{backgroundColor:Color.bgColor,height:'100%'}}>
          
         <View style={{backgroundColor:Color.barnerLogo, justifyContent:'space-between',flexDirection:'row',alignItems:'center',height:40,borderBottomColor:'darkgray',borderBottomWidth:1,marginBottom:30}}>
         <TouchableOpacity 
           style={{width:'33%', paddingLeft:10,alignContent:'center',alignSelf:'center'}}
           onPress={()=>{
            //this.props.navigation.navigate('DrawerOpen');
            navigation.dispatch(DrawerActions.openDrawer());
          }}
            >
           <Icon
              name="menu"
              color={'#fff'}
              size={35}
          />

        </TouchableOpacity>
            <Text style={styles.subTitle}>
                Dashboard
            </Text>
            <TouchableOpacity onPress={logoutCalled} style={{width:'33%',alignItems:'flex-end',paddingRight:10}}>
            <Icon
              name="logout"
              color={'#fff'}
              size={30}
          />
              </TouchableOpacity>
          </View>
            <Image 
                            source={require('../images/iptlogo.png')}  
                            resizeMode="contain"
                            style={{width: DEVICE_WIDTH-20, height: 220,marginBottom:20,alignSelf:'center' }}
                        />
            <View style={{margin:10,paddingBottom:15}}>
            <Text style={{fontSize:30,color:Color.logoBlue,fontWeight:'500'}}>Welcome,</Text>
            <Text style={{fontSize:30,color:Color.logoBlue,fontWeight:'500'}}>{userDetails.patientName.firstName} {userDetails.patientName.lastName}!</Text>
            {/* <Text style={{fontSize:15,color:Color.logoBlue}}>{'\n'} {userDetails.customerLastName}</Text> */}
            <Text style={{fontSize:40,color:'#84796B',fontWeight:'500',width:'100%',alignSelf:'center',textAlign:'center',marginTop:40,paddingHorizontal:30}}>Please use menu button to check list of measures</Text> 
         
           
           </View>
           
          

            
        </View>
       
        {/* <TouchableOpacity onPress={sendDataToWebView}>
          <Text>Say Hi</Text>
        </TouchableOpacity> */}
    
      </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      backgroundColor: Color.barnerLogo
    },
    horizontal: {
      flexDirection: 'column',

    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        fontSize:60
      },
      subTitle: {
        width:'34%',
        textAlign: 'center',
        fontSize:20,
        color:'#fff'
      },
  });

export default Dashboard;