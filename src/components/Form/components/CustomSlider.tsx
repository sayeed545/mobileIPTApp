import {useEffect, useState} from 'react';
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert, Image } from "react-native";
import { Color } from '../../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../redux/store/store';
import { Slider } from '@react-native-assets/slider'
//import  Slider  from '@react-native-community/slider'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const  DEVICE_HEIGHT = Dimensions.get('window').height
const  DEVICE_WIDTH = Dimensions.get('window').width

export default function CustomSlider(props: any) {

  const [sliderValue, setSliderValue] = useState<number>(props.item.scale.lowValue);
  // const myProfile = useAppSelector<profile>((state: any) => state.service.profile);
  // console.log("myProfile Data:::::",myProfile);


  


  useEffect(() => {
      console.log("item slifert",props.item);
  }, [])
   return (
   <View style={{ backgroundColor:'#F8F8F8',width:'100%',height:150,padding:10,borderBottomColor:'gray',borderBottomWidth:1,paddingVertical:20}}>
   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,fontWeight:'500',color:'#303030'}}>{props.item.measureItemName} : </Text>
        <Text style={{fontSize:22,fontWeight:'500',color:'#505050',right:20}}>{sliderValue}</Text>
      </View>
      <View style={{width:'100%',padding:0}}>
      {/* <MultiSlider
      values={[props.item.scale.lowValue]}
      min={props.item.scale.lowValue}
      max={props.item.scale.highValue}
      step={props.item.scale.interval}
      enabledOne = {true}
      // minimumTrackTintColor="#303030"
      // maximumTrackTintColor="#C0C0C0"
      //renderStepNumber={true}
      //tapToSeek={true}
      //thumbTintColor={'#E8923C'}
      sliderLength={DEVICE_WIDTH-100}
      selectedStyle={{
        backgroundColor: 'gold',
      }}
      unselectedStyle={{
        backgroundColor: 'silver',
      }}
      trackStyle={{
        height: 5,
        backgroundColor: 'red',
      }}
      //customMarker={require('../../../images/greenActive.png')}  
      customMarker={() => {
        return (
          <View
            style={{height: 30,
              width: 30,backgroundColor:'#E8923C',borderRadius:15}}
            
          />
        );
      }}  
       onValuesChange={(value) => {
        setSliderValue(value[0])
       
        
      }}
      onValuesChangeFinish={(value) => {
        console.log("onValuesChangeFinish:::::::",value[0],props.item);
        props.formValue([{...props.item, responseScore:value[0],"responseMessage": "Satisfied"}]); 

      }}
      /> */}
      <Slider
      key={props.item._id}
          style={{width: '90%', height: 50,justifyContent:'center',alignSelf:'center'}}
          minimumValue={props.item.scale.lowValue}
          maximumValue={props.item.scale.highValue}
          step={props.item.scale.interval}
          minimumTrackTintColor="gold"
          maximumTrackTintColor="#C0C0C0"
          onValueChange={(value) => {
            setSliderValue(value)
            console.log("value:::::::",value);
          }}
          onSlidingComplete={(value) => {
        props.formValue([{...props.item, patientScore:value,"patientScoreText": ""}]); 

      }}
          //renderStepNumber={true}
          //tapToSeek={true}
          thumbTintColor={'#E8923C'}
          //thumbSize={30}
          trackStyle={{width:'50%'}}
          thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
          //thumbImage={require('../../../images/greenActive.png')}  

        />
        <View style={styles.labelsContainer}>
        {[props.item.scale.lowValue, props.item.scale.highValue].map((val) => {
          return (
            <Text key={val} style={styles.label2}>
              {val}
            </Text>
          );
        })}
      </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,paddingHorizontal:10}}>
        <Text style={{fontSize:15,color:'#505050'}}>{props.item.scale.lowValueText}</Text>
        <Text style={{fontSize:15,color:'#505050'}}>{props.item.scale.highValueText}</Text>
      </View>
      
   </View>
   );
 }

 const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: Color.barnerLogo,
  },
  horizontal: {
    flexDirection: 'column',

  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'98%',
    alignSelf:'center'
  },
  label2: {
    fontSize: 12,
    color: '#333',
    width: 30,
    textAlign: 'center',
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
    thumb: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
      backgroundColor: 'white',
      borderColor: '#30a935',
      borderWidth: 2,
    },
    track: {
      height: 4,
      borderRadius: 2,
    },
    
});