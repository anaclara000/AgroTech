import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'

export default function home({navigation}) { 
    return(
    <View style={styles.container}>
        <View style={styles.botoes}>
            <Image style={styles.img} source="https://raw.githubusercontent.com/wellifabio/senai2022/master/2des/indmo/aula09/data/assets/arquivo.png"></Image>
            <TouchableOpacity style={styles.text} onPress={() =>{navigation.navigate('Historico')}}>Histórico de Vacinas</TouchableOpacity>
        </View>
        <View style={styles.botoes}>
            <Image style={styles.img} source="https://raw.githubusercontent.com/wellifabio/senai2022/master/2des/indmo/aula09/data/assets/vacinacao.png"></Image>
        <TouchableOpacity style={styles.text}  onPress={() =>{navigation.navigate('Registro')}}>Registrar Vacina</TouchableOpacity>
        </View>
    </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor : '#505050'
    },
    botoes: {
        marginTop: '20px',
        padding: '20px',
        alignItems: 'center',
        textAlign: 'center',
        width: 150,
        height: 130,
        backgroundColor: '#e5e5e5',
        borderRadius: '10px',
        fontFamily: 'Calibri',
        color: '#8a66fa',
        fontWeight: 'bold',
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
        width: 50,
        height: 50,
    },

    text: {
        marginTop: '10px',
    }
  });

