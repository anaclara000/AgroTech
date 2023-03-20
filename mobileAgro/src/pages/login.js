import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'
import CryptoJS from "react-native-crypto-js";
var AES = require("react-native-crypto-js").AES;



// import Home from '../Home/Home'
import MyTabs from '../../components/tab'

var uriCard_Usuarios = 'http://localhost:3000/Usuario'

var usuarios = []

const options = { method: 'GET' };

fetch(uriCard_Usuarios, options)
    .then(res => res.json())
    .then(res => {
        usuarios = res;

    }
    )
    .catch(err => console.error(err));


var userInfo = JSON.parse(localStorage.getItem("info"))

export default function login({ navigation }) {


    if (userInfo != null) {
        navigation.navigate("MyTabs")

    }

    const [input, setInput] = useState('')
    const [hidePass, sideHidePass] = useState(true);


    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");


    function logar() {

        console.log('logando');

        let data = {
            "email": usuario,
            "senha": input
        }


        console.log(data);

        fetch("http://localhost:3000/Login", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(data)
        })
            .then(res => { return res.json() })
            .then(data => {

                console.log(data.erro);

                if (data.erro === undefined && data.status != "funcionario") {
                    console.log(data)
                    localStorage.setItem("info", JSON.stringify({ "id_user": data.uid, "nome": data.uname, "token": data.token }));


                    navigation.navigate("MyTabs")

                } else {
                    console.log("Não permitido")
                }
            })
    }




    return (
        <View style={styles.container}>
            <Image style={styles.img} source="https://www.emojiall.com/images/animations/joypixels/128px/cow_face.gif" />
            <TextInput style={styles.input} placeholder="Informe o email" onChangeText={(value) => { setUsuario(value) }} />
            <TextInput style={styles.input} placeholder="Informe a senha" value={input} onChangeText={(texto) => { setInput(texto) }} secureTextEntry={hidePass} />
            {/* <TouchableOpacity style={styles.btn} onPress={() => {
                users.forEach(user => {
                    if (user.email === email && user.senha === password) navigation.navigate("Home", { "id": user.id - 1 });
                })
            }}>Login</TouchableOpacity> */}

            <TouchableOpacity style={styles.btn} onPress={logar}>
                <Text style={{ color: 'white', fontSize: '15px' }}>Logar</Text>
            </TouchableOpacity>
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
        backgroundColor: '#da8510',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    img: {
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
