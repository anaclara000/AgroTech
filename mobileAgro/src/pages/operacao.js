import * as React from 'react'
import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react';

export default function home({ navigation }) {
    const [manutencao, setManutencao] = useState([]);
    useEffect(() => {
        const options = { method: 'GET' };
        fetch('http://localhost:3000/Manutencao', options)
            .then(res => { return res.json() })
            .then(data => {
                setManutencao(data);
            })
    }, []);

    useEffect(() => {
    }, [manutencao]);

    const [veiculo, setVeiculo] = useState([]);
    useEffect(() => {
        const options = { method: 'GET' };
        fetch('http://localhost:3000/Veiculos', options)
            .then(res => { return res.json() })
            .then(data => {
                setVeiculo(data);
            })
    }, []);

    useEffect(() => {
    }, [veiculo]);


    // var img = require('');
    const dataFim = "-"
    return (

        <View>
            
               <View style={styles.nome}>
                            <Text style={styles.color_name}>AgroTech</Text>
                        </View>
                        <Text>Em manutenção</Text>
                            <Text>Cancelada</Text>
                            <Text>Finalizada</Text>
            {
                manutencao.map((m, index) => {
                    if (m.data_fim == null) {
                        m.data_fim = dataFim

                    } else {
                        m.data_fim.slice(0, 10)
                    }


                    return (
                        <View style={styles.container} key={index}>
                            {/* <ImageBackground style={{ width: '100%', height: '100vh' }} source={{ uri: 'https://mobimg.b-cdn.net/v3/fetch/4c/4ccef9c7a63cb6dc60439866a79c1f56.jpeg?h=900&r=0.5' }}> */}
                     
                           
                            <View style={styles.card_general}>
                                <View style={styles.title}>
                                    <Image source={m.status == "Em manutenção" ? require('../../assets/Camarelo.png') : (m.status == "Cancelada" ? require('../../assets/Cvermelho.png') : require('../../assets/Cverde.png'))} style={{ width: 15, height: 15 }} />
                                    <Text style={styles.id}>ID: {m.id}</Text>
                                </View>

                                <View style={styles.card}>
                                    <View>

                                        <Text >Data Inicio: {m.data_inicio.slice(0, 10)}</Text>
                                        <Text >Data fim: {m.data_fim}</Text>
                                        <Text >Descrição: {m.descricao}</Text>
                                        <Text >Veiculo: {m.veiculos.tipo} | {m.veiculos.placa}</Text>
                                    </View>

                                    <View style={styles.infos}>

                                        {/* <Text>Status: {m.status}</Text> */}

                                        <Text style={styles.valor}>Valor: R${m.valor}</Text>
                                    </View>
                                </View>

                            </View>
                            {/* </ImageBackground> */}
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
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },

    infos: {
        marginLeft: '10%'
    },
    valor: {
        textAlign: 'center',
        backgroundColor: 'green',
        padding: '5px',
        color: '#fff',
        borderRadius: '10px',
    },
    card_general: {
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: '10px',
        padding: '10px',
        borderRadius: '10px'
    },
    title: {
        backgroundColor: '#da9732',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: '2px',
        padding: '2%',

    },
    id: {
        marginLeft: '10px',
    },
    nome: {
        backgroundColor: '#da9732',
        width: '100%',
        textAlign: 'center',
        padding: '5px'
       
    },
    color_name: {
        color: '#fff',
        fontSize : '25px'
    }

});

