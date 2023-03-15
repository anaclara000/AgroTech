import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import Home from '../src/pages/Home';

export default function MyMenu() {
  return (
    
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} /> 
    </Stack.Navigator>
  </NavigationContainer>
  );
}