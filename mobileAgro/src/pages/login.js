import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button , Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'

export default function login({navigation}) { 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const users = [
        {
            "email":"fulano@gmail.com",
            "senha":"umdoistresquatro",
        },
        {
            "email":"beltrano@ig.com.br",
            "senha":"s3nh4",
        }
    ];

    return(
        <View style={styles.container}>
            <Image style={styles.img}  source="https://www.emojiall.com/images/animations/joypixels/128px/cow_face.gif"  />
            <TextInput style={styles.input} placeholder="Informe o email" onChangeText={(value) => {setEmail(value)}} />
            <TextInput style={styles.input} placeholder="Informe a senha" onChangeText={(value) => {setPassword(value)}} />
            <TouchableOpacity style={styles.btn} onPress={() => {
                users.forEach(user => {
                    if(user.email === email && user.senha === password) navigation.navigate("Home", {"id": user.id - 1});
                 })
            }}>Login</TouchableOpacity>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#da9732',
        alignItems: 'center',
    },
    input: {
        width: 250,
        margin: '10px',
        padding: '10px',
        backgroundColor: '#ffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        borderRadius: '5px',
        placeholderTextColor: "#00000077",
        secureTextEntry: true,
    },
    btn: {
        marginTop: '10px',
        fontFamily: 'Calibri',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '20px',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#fff',
        width: 250,
        border: 'none',
        backgroundColor :'#da8510',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    img : {
        marginTop: '100px',
        width: 200,
        height: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    }
  });
