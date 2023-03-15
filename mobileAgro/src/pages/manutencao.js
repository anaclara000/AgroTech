import { ImageBackground, Text, View, Image, TouchableOpacity, StyleSheet, Picker, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react'
import { useState, useEffect } from 'react';



// export default function Manutencao({navigation}){

//     const [operacao, setOperacao] = useState([]);
//     const [tipoSelecionado, setTipoSelecionado] = useState("");

//     useEffect(() => {
//       const options = { method: 'GET' };
//       fetch('http://localhost:3000/Manutencao', options)
//         .then(res => { return res.json() })
//         .then(data => {
//           setOperacao(data);
//         });
//     }, []);

//     const dataFim = "-"

//     const tipos = ["Carga", "Visita", "Venda"];

//     return (
//       <View>
//         <Picker
//           selectedValue={tipoSelecionado}
//           onValueChange={(itemValue) => setTipoSelecionado(itemValue)}
//         >
//           <Picker.Item label="Selecione o tipo" value="" />
//           {tipos.map((tipo, index) => (
//             <Picker.Item key={index} label={tipo} value={tipo} />
//           ))}
//         </Picker>
//         {operacao
//           .filter((op) => tipoSelecionado === "" || op.veiculos.tipo === tipoSelecionado)
//           .map((m, index) => {
//             if (m.data_fim == null) {
//               m.data_fim = dataFim;
//             } else {
//               m.data_fim.slice(0, 10);
//             }
//             return (
//               <View style={styles.container} key={index}>
//                 <View style={styles.card}>
//                 <Image source={m.status == "Em manutenção" ? require('../../assets/Camarelo.png') : (m.status == "Cancelada" ? require('../../assets/Cvermelho.png') : require('../../assets/Cverde.png'))} style={{ width: 15, height: 15 }} />
//                   <Text>ID: {m.id}</Text>
//                   <Text>Data Inicio: {m.data_inicio.slice(0, 10)}</Text>
//                   <Text>Data fim: {m.data_fim}</Text>
//                   <Text>Valor: R${m.valor}</Text>
//                   <Text>Descrição: {m.descricao}</Text>
//                   <Text>Veiculo: {m.veiculos.tipo + " | " + m.veiculos.placa}</Text>
//                 </View>
//               </View>
//             );
//           })}
//       </View>
//     );

// }

export default function Manutencao({ navigation }) {
  const [operacao, setOperacao] = useState([]);
  const [tiposOperacao, setTiposOperacao] = useState([]);
  const [operacaoFiltrada, setOperacaoFiltrada] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('');

  useEffect(() => {
    const options = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options)
      .then(res => res.json())
      .then(data => {
        setOperacao(data);
        setOperacaoFiltrada(data);
      });
  }, []);

  useEffect(() => {
    const options = { method: 'GET' };
    fetch('http://localhost:3000/Manutencao', options)
      .then(res => res.json())
      .then(data => {
        setTiposOperacao(data);
      });
  }, []);

  const tipos = ["Carga", "Visita", "Venda"];
  const dataFim = "-";

  const handleTipoChange = (tipo) => {
    setTipoSelecionado(tipo);
    let operacoesFiltradas = operacao;
    if (tipo) {
      operacoesFiltradas = operacoesFiltradas.filter(m => m.veiculos.tipo === tipo);
    }
    if (statusSelecionado) {
      operacoesFiltradas = operacoesFiltradas.filter(m => m.status === statusSelecionado);
    }
    setOperacaoFiltrada(operacoesFiltradas);
  };

  const handleStatusChange = (status) => {
    setStatusSelecionado(status);
    let operacoesFiltradas = operacao;
    if (status) {
      operacoesFiltradas = operacoesFiltradas.filter(m => m.status === status);
    }
    if (tipoSelecionado) {
      operacoesFiltradas = operacoesFiltradas.filter(m => m.veiculos.tipo === tipoSelecionado);
    }
    setOperacaoFiltrada(operacoesFiltradas);
  };

  return (
    <View>
      <View style={styles.nome}>
        <Text style={styles.color_name}>AgroTech</Text>
      </View>
      <View style={styles.subtitle}>
        <View style={styles.subtitle_imgs}>
          <Image  source={require('../../assets/Camarelo.png')} style={{ width: 15, height: 15 }}/>
        <Text>Em manutenção</Text>
        </View>
        
        <View style={styles.subtitle_imgs}>
        <Image  source={require('../../assets/Cvermelho.png')} style={{ width: 15, height: 15 }}/>
          <Text>Cancelada</Text>
        </View>
        
        <View style={styles.subtitle_imgs}>
        <Image  source={require('../../assets/Cverde.png')} style={{ width: 15, height: 15 }}/>
        <Text>Finalizada</Text>
        </View>
       
      </View>

      <View>
        <Picker
          selectedValue={tipoSelecionado}
          onValueChange={(itemValue) => handleTipoChange(itemValue)}
        >
          <Picker.Item label="Selecione o tipo" value="" />
          {tipos.map((tipo, index) => (
            <Picker.Item key={index} label={tipo} value={tipo} />
          ))}
        </Picker>
      </View>
      <View>
        <Picker
          selectedValue={statusSelecionado}
          onValueChange={(itemValue) => handleStatusChange(itemValue)}
        >
          <Picker.Item label="Selecione o status" value="" />
          <Picker.Item label="Em manutenção" value="Em manutenção" />
          <Picker.Item label="Finalizada" value="Finalizada" />
          <Picker.Item label="Cancelada" value="Cancelada" />
        </Picker>
      </View>
      {operacaoFiltrada.length > 0 ? (
        operacaoFiltrada.map((m, index) => {
          if (m.data_fim == null) {
            m.data_fim = dataFim

          } else {
            m.data_fim.slice(0, 10)
          }

          return (
            <View style={styles.container} key={index}>
              <View style={styles.card}>
                <Image source={m.status == "Em manutenção" ? require('../../assets/Camarelo.png') : (m.status == "Cancelada" ? require('../../assets/Cvermelho.png') : require('../../assets/Cverde.png'))} style={{ width: 15, height: 15 }} />
                <Text>ID: {m.id}</Text>
                <Text>Data Inicio: {m.data_inicio.slice(0, 10)}</Text>
                <Text>Data fim: {m.data_fim.slice(0, 10)}</Text>
                <Text>Valor: R${m.valor}</Text>
                <Text>Descrição: {m.descricao}</Text>
                <Text>Veiculo: {m.veiculos.tipo + " | " + m.veiculos.placa}</Text>
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
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 10,
  },
  operacaoContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  nome: {
    backgroundColor: '#da9732',
    width: '100%',
    textAlign: 'center',
    padding: '5px'

  },
  color_name: {
    color: '#fff',
    fontSize: '25px'
  },
  subtitle: {
    flexDirection: 'row'
  },
  subtitle_imgs: {
    alignItems: 'center',
    textAlign : 'center',
    margin: '10px',
    flexDirection : 'row'
  }
});
