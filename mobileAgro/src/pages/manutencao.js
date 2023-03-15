import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet, Picker, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'
import { useState, useEffect } from 'react';

export default function Manutencao({ navigation }) {
  const [Manutencao, setManutencao] = useState([]);

  const [ManutencaoFiltrada, setManutencaoFiltrada] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('');
  const [tipoFinalizar, setFinalizar] = useState([]);

  
  useEffect(() => {
    const options = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options)
      .then(res => res.json())
      .then(data => {
        setManutencao(data);
        setManutencaoFiltrada(data);
      });
  }, []);

  useEffect(() => {
    const options = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options)
      .then(res => res.json())
      .then(data => {
        setTiposManutencao(data);
      });
  }, []);

  const tipos = ["Carga", "Visita", "Venda"];
  const dataFim = "-";
const veri = ""
  const handleTipoChange = (tipo) => {
    setTipoSelecionado(tipo);
    let manutencoesFiltradas = Manutencao;
    if (tipo) {
      manutencoesFiltradas = manutencoesFiltradas.filter(m => m.veiculos.tipo === tipo);
    }
    if (statusSelecionado) {
      manutencoesFiltradas = manutencoesFiltradas.filter(m => m.status === statusSelecionado);
    }
    setManutencaoFiltrada(manutencoesFiltradas);
  };

  const handleStatusChange = (status) => {
    setStatusSelecionado(status);
    let manutencoesFiltradas = Manutencao;
    if (status) {
      manutencoesFiltradas = manutencoesFiltradas.filter(m => m.status === status);
    }
    if (tipoSelecionado) {
      manutencoesFiltradas = manutencoesFiltradas.filter(m => m.veiculos.tipo === tipoSelecionado);
    }
    setManutencaoFiltrada(manutencoesFiltradas);
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
            selectedValue={tipoSelecionado}
            onValueChange={(itemValue) => handleTipoChange(itemValue)}
          >
            <Picker.Item label="Selecione o tipo" value="" />
            {tipos.map((tipo, index) => (
              <Picker.Item key={index} label={tipo} value={tipo} />
            ))}
          </Picker >
        </View>
        <View>
          <Picker style={{
            borderColor: '#da9732'
          }}
            selectedValue={statusSelecionado}
            onValueChange={(itemValue) => handleStatusChange(itemValue)}

          >
            <Picker.Item label="Selecione o status" value="" />
            <Picker.Item label="Em manutenção" value="Em manutenção" />
            <Picker.Item label="Finalizada" value="Finalizada" />
            <Picker.Item label="Cancelada" value="Cancelada" />
          </Picker>
        </View>
      </View>

      {ManutencaoFiltrada.length > 0 ? (
        ManutencaoFiltrada.map((m, index) => {
          if (m.data_fim == null) {
            m.data_fim = dataFim

          } else {
            m.data_fim.slice(0, 10)
          }
         
          return (
            <View style={styles.container} key={index}>
              <View style={styles.card}>
                <Text style={{
                  color: 'white',
                  textAlign: 'center',
                  backgroundColor: 'green'
                }}>Valor: R${m.valor}</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {/* <Image source={m.status == "Em manutenção" ? require('../../assets/Camarelo.png') : (m.status == "Cancelada" ? require('../../assets/Cvermelho.png') : require('../../assets/Cverde.png'))} style={{ width: 20, height: 20 }} /> */}

                  <View>
                    <Text>Descrição: {m.descricao}</Text>
                    <Text>Veiculo: {m.veiculos.tipo + " | " + m.veiculos.placa}</Text>
                  </View>

                  <View>
                    <Text>Data Inicio: {m.data_inicio.slice(0, 10)}</Text>
                    <Text>Data fim: {m.data_fim.slice(0, 10)}</Text>
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
        <Text>Nenhuma manutenção encontrada.</Text>
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
  ManutencaoContainer: {
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
