/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {store, persistor, useAppSelector} from './src/redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import DrawerRoutesList from './src/utils/drawerRoutes';
import StackRoutesList from './src/utils/stackRoutes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Color } from './src/theme';
import ProfileScreen from './src/components/ProfileScreen';
import About from './src/components/About';
import DynamicForm from './src/components/Form/DynamicForm';
//import {LocaleConfig} from 'react-native-calendars';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// LocaleConfig.locales['en'] = {
//   formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
//   monthNames: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ],
//   monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
//   dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
//   dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
//   // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
// };
// LocaleConfig.defaultLocale = 'en';




const DrawerNavigation = () => {
  const userDetails = useAppSelector((state) => state.user.details);
  console.log("i am in drawer navifation:::::",userDetails.assignedMeasures)
  const navigation = useNavigation<any>();
  return (
    
    <Drawer.Navigator  drawerContent={props => {
      
      return (
        <>
        <SafeAreaView style={{flex: 0, backgroundColor: Color.logoBlue2}}/>
        <SafeAreaView style={{flex: 1, backgroundColor: Color.bgColor}}>
        <DrawerContentScrollView  style={{backgroundColor:Color.bgColor}} {...props} scrollIndicatorInsets={{ right: 1 }}>
          <TouchableOpacity  
          activeOpacity={0.8} 
          onPress={() => navigation.navigate('Profile') }
          style={{marginBottom:10,width:'100%',height:200,borderBottomColor:'lightgray',borderBottomWidth:1, paddingTop:20,justifyContent: 'space-between'}}>
          <Icon
              style={{alignSelf:'center',borderRadius:50,borderWidth:1}}
              name="person"
              color={"black"}
              size={100}
          />
          <View style={{alignItems:'center',bottom:10}}>
            <Text style={{fontSize:20,marginBottom:10, color:Color.logoBlue}}>{userDetails.customerFirstName}</Text>
            {/* <Text style={{fontSize:15, color:'#fff'}}>{userDetails.customerLastName}</Text> */}
          </View>
          
          </TouchableOpacity>
        <DrawerItemList {...props} />
        
        </DrawerContentScrollView>
        </SafeAreaView>
        </>
      )
    }}>
    <Drawer.Group>
    {DrawerRoutesList.map((route,i) => {
                    const {name, component, options,iconName} = route;
                    return <Drawer.Screen  options={{
                      ...options,swipeEnabled: false,
                      drawerIcon: (({focused}) => <Icon name={iconName} size={30} color={focused ?  Color.logoBlue5 : "gray"} />)
                          
                    }} key={i} name={name} component={component}
                    />
                })}
      {userDetails.assignedMeasures && userDetails.assignedMeasures.map((item: { measureName: any; measureId: any; options: any; iconName: any; }) => {
                    const {measureName, measureId, options,iconName} = item;
                    return <Drawer.Screen  options={{headerShown: false,gestureEnabled: false,swipeEnabled: false,
                      ...options,
                      drawerIcon: (({focused}) => <Icon name={"feed"} size={30} color={focused ?  Color.logoBlue5 : "gray"} />)
                          
                    }} key={measureId} name={measureName}>
                      {(props: any) => <DynamicForm {...props} data={item} />}
                    </Drawer.Screen>
                    
                    //component={DynamicForm}
                }
          )}
          <Drawer.Screen  options={{headerShown: false,swipeEnabled: false,
                      drawerIcon: (({focused}) => <Icon name={"person"} size={30} color={focused ?  Color.logoBlue5 : "gray"} />)
                          
                    }} key={97} name={"Profile"} component={ProfileScreen}
                    />
          <Drawer.Screen  options={{headerShown: false,swipeEnabled: false,
                      drawerIcon: (({focused}) => <Icon name={"info"} size={30} color={focused ?  Color.logoBlue5 : "gray"} />)
                          
                    }} key={97} name={"About"} component={About}
                    />
      </Drawer.Group>
    </Drawer.Navigator>
   
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  console.log("this is a test");
  console.log("this is a test11111");
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Group>
                {StackRoutesList.map((route,i) => {
                    const {name, component, options} = route;
                    return <Stack.Screen options={options} key={i} name={name} component={component}/>
                })}
                <Stack.Screen
                  name="Home"
                  component={DrawerNavigation}
                  //headerLeft={null}
                  //gestureEnabled={false}
                  options={{ headerShown: false,gestureEnabled:false }}
                />
                
            </Stack.Group>
        </Stack.Navigator>
        
  </NavigationContainer>
  </PersistGate>
  </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
