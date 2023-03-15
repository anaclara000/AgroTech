import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet, Picker, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'
import { useState, useEffect } from 'react';

export default function Operacao({ navigation }) {
    const [motorista, setmotorista] = useState([]);
    const [Operacao, setOperacao] = useState([]);
    const [OperacaoFiltrada, setOperacaoFiltrada] = useState([]);
    const [tipoSelecionado, setTipoSelecionado] = useState('');
    const [statusSelecionado, setStatusSelecionado] = useState('');
    const [tipoFinalizar, setFinalizar] = useState([]);


    useEffect(() => {
        const options = { method: 'GET' };
        fetch('http://localhost:3000/Operacao', options)
            .then(res => res.json())
            .then(data => {
                setOperacao(data);
                setOperacaoFiltrada(data);
            });
    }, []);







    const datafim = "-";

    const handleStatusChange = (status) => {
        setStatusSelecionado(status);
        let operacoesFiltradas = Operacao;
        if (status) {
            operacoesFiltradas = operacoesFiltradas.filter(m => m.status === status);
        }
        if (tipoSelecionado) {
            operacoesFiltradas = operacoesFiltradas.filter(m => m.veiculos.tipo === tipoSelecionado);
        }
        setOperacaoFiltrada(operacoesFiltradas);
    };

    return (
        <View >
            <View style={styles.nome}>
                <Text style={styles.color_name}>AgroTech</Text>
            </View>
            <View style={styles.subtitle}>
                <View style={styles.subtitle_imgs}>
                    <Image source={require('../../assets/Camarelo.png')} style={{ width: 15, height: 15 }} />
                    <Text style={{ marginLeft: '4px' }}>Em manutenção</Text>
                </View>

                <View style={styles.subtitle_imgs}>
                    <Image source={require('../../assets/Cvermelho.png')} style={{ width: 15, height: 15 }} />
                    <Text style={{ marginLeft: '4px' }}>Cancelada</Text>
                </View>

                <View style={styles.subtitle_imgs}>
                    <Image source={require('../../assets/Cverde.png')} style={{ width: 15, height: 15 }} />
                    <Text style={{ marginLeft: '4px' }}>Finalizada</Text>
                </View>

            </View>

            <View style={styles.select}>
                <View style={{ marginRight: '10px' }}>
                    <Picker style={{
                        borderColor: '#da9732'
                    }}
                        selectedValue={statusSelecionado}
                        onValueChange={(itemValue) => handleStatusChange(itemValue)}

                    >
                        <Picker.Item label="Selecione o status" value="" />
                        <Picker.Item label="Em operação" value="Em operação" />
                        <Picker.Item label="Finalizada" value="Finalizada" />
                        <Picker.Item label="Cancelada" value="Cancelada" />
                    </Picker>
                </View>
            </View>
           
            {OperacaoFiltrada.length > 0 ? (
                OperacaoFiltrada.map((m, index) => {
                    if (m.dataFim == null) {
                        m.dataFim = datafim

                    } else {
                        m.dataFim.slice(0, 10)
                    }
                    return (
                        <View style={styles.container} key={index}>
                            <View style={styles.card}>
                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    backgroundColor: '#da9732',
                                    padding: '10px'
                                }}>{m.descricao}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    {/* <Image source={m.status == "Em manutenção" ? require('../../assets/Camarelo.png') : (m.status == "Cancelada" ? require('../../assets/Cvermelho.png') : require('../../assets/Cverde.png'))} style={{ width: 20, height: 20 }} /> */}

                                    <View>
                                        <Text>Motorista: {m.id}</Text>
                                        <Text>Veiculo: {m.idVeiculo}</Text>
                                    </View>

                                    <View>
                                        <Text>Data Inicio: {m.dataInicio.slice(0, 10)}</Text>
                                        <Text>Data fim: {m.dataFim.slice(0, 10)}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Picker style={{
                                        textAlign: 'center',
                                        borderColor: '#da9732',
                                        width: '50%'
                                    }}
                                    // selectedValue={statusSelecionado}
                                    // onValueChange={(itemValue) => handleStatusChange(itemValue)}

                                    >
                                        <Picker.Item label="Selecione a ação" value="" />
                                        <Picker.Item label="Finalizar" value="Cancelar" />
                                        <Picker.Item label="Cancelar" value="Cancelada" />
                                    </Picker>

                                    <TouchableOpacity style={{
                                        backgroundColor: '#da9732',
                                        padding: '3px',
                                        width: '100px',
                                        fontFamily: 'Arial',
                                        textAlign: 'center',
                                        color: 'white'
                                    }}>Salvar</TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    );
                })
            ) : (
                <Text>Nenhuma operação encontrada.</Text>
            )}

        </View>
    );


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    pickerContainer: {
        marginBottom: 10,
    },
    filterContainer: {
        marginBottom: 10,
    },
    OperacaoContainer: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
    },
    nome: {
        width: '100%',
        textAlign: 'center',
        padding: '5px'

    },
    color_name: {
        color: '#da9732',
        fontSize: '25px',
        fontWeight: 'bold',
    },
    subtitle: {
        flexDirection: 'row'
    },
    subtitle_imgs: {
        alignItems: 'center',
        textAlign: 'center',
        margin: '10px',
        flexDirection: 'row'
    },
    card: {

        borderRadius: '10px',
        width: '100%',
        borderColor: '#da9732',
        borderWidth: 1,
        padding: '10px'
    },
    select: {
        justifyContent: 'center',
        flexDirection: 'row'
    }
});
