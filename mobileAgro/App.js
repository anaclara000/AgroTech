import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import Login from './src/pages/login'
import Home from './src/pages/Home'

import MyTabs from './components/tab'

const Stack = createNativeStackNavigator();
import MyMenu from './components/stack'

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyTabs" component={MyTabs} options={{ title: '', headerTransparent: true, headerShow: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}



