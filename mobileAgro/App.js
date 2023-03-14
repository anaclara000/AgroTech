import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import login from './src/pages/login'

import  MyTabs from './components/tab'
 
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}



