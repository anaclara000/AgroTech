import {ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'

import { useState, useEffect } from 'react';

export default function home({navigation}) { 

    const [operacao, setOperacao] = useState([]);
    useEffect(() => {
        const options = { method: 'GET' };
        fetch('http://localhost:3000/Operacao', options)
            .then(res => { return res.json() })
            .then(data => {
                setOperacao(data);
            })
    }, []);
    useEffect(() => {
    }, [operacao]);

    const dataFim = "Em operação"
    return (

        <View>
            {
                operacao.map((m, index) => {
                    if (m.data_fim == null) {
                        m.data_fim = dataFim
                    } else {
                        m.data_fim.slice(0, 10)
                    }
                    return (
                        <View style={styles.container} key={index}>
                            <ImageBackground style={{width: '100%', height: '100vh'}} source={{uri :'https://mobimg.b-cdn.net/v3/fetch/d1/d1e76960edebe95e466aa9397c9cdf74.jpeg?h=900&r=0.5'}}>
                            <View style={styles.card}>
                                <Text >ID: {m.id}</Text>
                                <Text >Data Inicio: {m.dataInicio.slice(0, 10)}</Text>
                                <Text >Data fim: {m.dataFim}</Text>
                                <Text >id_Motorista: R${m.id_Motorista}</Text>
                                <Text >Descrição: {m.descricao}</Text>
                                <Text >idVeiculo: {m.idVeiculo}</Text>
                            </View>
                            </ImageBackground>           
                        </View>

                    )
                })
            }
        </View>

    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    card: {
        width: '90%',
        margin: '10px',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#fff'
    }

});

