import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import operacao from '../src/pages/operacao';
import manutencao from '../src/pages/manutencao';

export default function MyTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Manutenções" component={manutencao} />
      <Tab.Screen name="Operações" component={operacao} />

    </Tab.Navigator>
  );
}