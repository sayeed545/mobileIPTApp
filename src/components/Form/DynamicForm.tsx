import {useEffect, useState} from 'react';
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Color } from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { Dropdown } from 'react-native-element-dropdown';
import {  getFormData, postForm } from '../../services/services.action';
import { profile } from '../../interfaces/profile';
import { reset as resetUser} from '../../redux/user.slice';
import CustomSlider from './components/CustomSlider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const  DEVICE_HEIGHT = Dimensions.get('window').height

export default function DynamicForm(props: any) {

  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.user.details);
  const [formList, setFormList] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [measureDetails, setMeasureDetails] = useState<{measureId: number, measureName: string}>();
  // const myProfile = useAppSelector<profile>((state: any) => state.service.profile);
  // console.log("myProfile Data:::::",myProfile);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();



  const getFormListItems = async () => {
    const response = await dispatch(getFormData(props.data.measureId));    
    console.log("getFormData list:::::",response.payload);
    if (response.payload) {
      var respData = response.payload;
      console.log("respData::::::::",respData);
      var measureItems = [...respData.measureItems];
      measureItems.map((item) => {
        item.patientScore = item.scale.lowValue;
        item.patientScoreText = ""
      })
      setMeasureDetails({measureId: respData.measureId, measureName: respData.measureName})
      setFormList(respData.measureItems);
    }
  }
  useEffect(() => {
    setFormList([]);
    getFormListItems();
    console.log("userDetails.createdBy",userDetails.createdBy);
  }, [isFocused])
  const formValueUpdate = async (data : any) => {
    //var currentArr = [...formList];
    var res = formList.map(obj => data.find(o => o.measureItemId === obj.measureItemId) || obj);
    setFormList(res);

    
  }
  const formSubmit = async () => {
    let postData = { "patientId": userDetails.patientId,
      
    "feedbackMeasures": {
        "patientComments":comment,
        "measureId":measureDetails?.measureId,
        "measureName": measureDetails?.measureName,
        "measureItems": formList,
        "createdBy":userDetails.createdBy

      }
    }
    console.log("resresresres:::::",postData);
    const response = await dispatch(postForm(postData));    
    console.log("postForm data:::::",response);
    if (response.payload) {
      // await setComment("");
      // await setFormList([]);
      // await getFormListItems();
      Alert.alert("",response.payload);
      navigation.navigate('Dashboard')
      
      //
      
    }
    else
    {
     // Alert.alert("",response.error.message)
    }
  }
   return (
    <ImageBackground
        //source={require('../images/imageBG.png')}
         style={{
          flex:1,
          backgroundColor:Color.bgColor,
        justifyContent: 'flex-start',
        height:'100%'

      }}>

      <View style={{backgroundColor:Color.barnerLogo,height:insets.top}}/>
          <View style={{backgroundColor:Color.bgColor}}>
        <View style={{ backgroundColor:Color.barnerLogo, flexDirection:'row',alignItems:'center',height:40,borderBottomColor:'darkgray',borderBottomWidth:1,marginBottom:0}}>
         <TouchableOpacity 
           style={{width:'10%', paddingLeft:10,alignContent:'center',alignSelf:'center'}}
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
                {props.data.measureName}
            </Text>
         <Text style={{width:'33%'}}></Text>
          </View>
          <KeyboardAvoidingView style={{flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={10}>
          <ScrollView style={{height:'100%'}} contentContainerStyle={{paddingBottom:Platform.OS === 'ios' ? 150+insets.top : 150+insets.top+insets.bottom}}>
            {formList.map((item) => {
              return <CustomSlider key={item.measureItemId} item={item} formValue={formValueUpdate} />
            })}
          <View style={{paddingHorizontal:10, backgroundColor:'#F8F8F8',paddingBottom:20,borderBottomColor:'gray',borderBottomWidth:1}}>
            <Text style={styles.commentLabel}>Comments:</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Add your comments here..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={5}
            />
          </View>
          
          
          </ScrollView>
          </KeyboardAvoidingView>
          </View>
          
          
          <TouchableOpacity onPress={formSubmit} style={{backgroundColor:'#36648F',width:'100%',height:60,bottom:Platform.OS === 'ios' ? 0 : insets.bottom,position:'absolute',left:0,alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:25,fontWeight:600,top:10}}>Submit</Text>
          </TouchableOpacity>
          {Platform.OS === 'android' && <View style={{position:'absolute',bottom:0, backgroundColor:Color.bgColor,height:insets.bottom,width:'100%'}}/>}
    </ImageBackground>
   );
 }

 const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: Color.barnerLogo,
    flex:1
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
      width:'80%',
      textAlign: 'center',
      fontSize:20,
      color:'#fff'
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      color:Color.logoBlue5,
      fontWeight:'bold'
    },
    placeholderStyle: {
      fontSize: 16,
      color:Color.modalTitle,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: Color.logoBlue5
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    commentLabel: {
      fontSize: 20,
      fontWeight:'500',
      marginBottom: 6,
      color:'#303030',
      marginTop:10
    },
    commentInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      textAlignVertical: 'top',
      backgroundColor: '#f1f1f1',
      fontSize:15
    },
});