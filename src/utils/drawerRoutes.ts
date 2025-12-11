import {FC} from 'react';
import Dashboard from '../components/Dashboard'
import ProfileScreen from '../components/ProfileScreen';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import About from '../components/About';


interface Route {
  name: string;
  component: FC;
  options?: DrawerNavigationOptions;
  iconName: string
}
const options: DrawerNavigationOptions = {
  headerShown: false,
  //gestureEnabled: true,
};
//Add your screen/page here
const DrawerRoutesList: Array<Route> = [
  {
    name: 'Dashboard',
    component: Dashboard,
    options,
    iconName: 'home'
  },
  
  // {
  //   name: 'My Profile',
  //   component: ProfileScreen,
  //   options,
  //   iconName: 'person'
  // },
  // {
  //   name: 'About',
  //   component: About,
  //   options,
  //   iconName: 'info'
  // },
  
  
  
  
 
];
export default DrawerRoutesList;
