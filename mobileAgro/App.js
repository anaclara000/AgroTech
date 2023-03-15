import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import login from './src/pages/login'
import Home from './src/pages/Home'

import MyTabs from './components/tab'

import MyMenu from './components/stack'

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}



