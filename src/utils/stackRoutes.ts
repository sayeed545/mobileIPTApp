import {FC} from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';
import LoginScreen from '../components/LoginScreen'
import ChangePassword from '../components/ChangePassword'


interface Route {
  name: string;
  component: FC;
  options?: StackNavigationOptions;
}
const options: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};
//Add your screen/page here
const StackRoutesList: Array<Route> = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
    options,
  },
  {
    name: 'ChangePassword',
    component: ChangePassword,
    options,
  }
 
];
export default StackRoutesList;
