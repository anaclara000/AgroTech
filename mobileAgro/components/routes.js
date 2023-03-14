import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, TextInput } from 'react-native';


import Home from '../src/pages/Home'
// import Topics from '../src/pages/Topics/TopicsPage'
// import ButtonNew from '../components/ButtonNew'
// import CadastrarPerg from '../src/pages/CadastrarPergunta/cadastrarPerg'
// import Logout from '../src/pages/Logout/LogoutPage'
// import User from '../src/pages/User/UserPage'

const Tab = createBottomTabNavigator();

export default function Routes({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarStyle: ({ focused, color, size }) => {
                    style: {
                        background: 'black'
                    }
                },

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    }
                    if (route.name === 'Topics') {
                        iconName = focused
                            ? 'ios-list'
                            : 'ios-list-outline';

                    }
                    if (route.name === 'Logout') {
                        iconName = focused
                            ? 'ios-log-out'
                            : 'ios-log-out-outline';
                    }
                    if (route.name === 'Users') {
                        iconName = focused
                            ? 'ios-person'
                            : 'ios-person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#212124',
                tabBarInactiveTintColor: 'grey',
            })}>


            <Tab.Screen name="Home"
                component={Home}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />


            {/* <Tab.Screen name="Topics"
                component={Topics}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />

            <Tab.Screen
                name="New"
                component={CadastrarPerg}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size, color }) => (
                        size = "25pt",
                        <ButtonNew size={size} color={color} focused={focused} />
                    )
                }}
            />

            <Tab.Screen
                name="Users"
                component={User}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            />

            <Tab.Screen
                name="Logout"
                component={Logout}
                options={{
                    title: '',
                    headerTransparent: true,
                    headerShow: false
                }}
            /> */}
        </Tab.Navigator>
    )
}
