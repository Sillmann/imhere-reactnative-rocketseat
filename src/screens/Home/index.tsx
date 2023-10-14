import { useState } from 'react';

import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export default function Home() {

  const [participants, setParticipants ] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {

    if (participants.includes(participantName)) {
        return Alert.alert("Participante Existe","Já existe com esse nome!")
      }

    setParticipants(prevState => [...prevState, participantName]);

    setParticipantName('');

    }

  function handleParticipantRemove(name: string) {
    Alert.alert('Remover',`Remover o participante ${name}?`,[
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }      

  return(
    <View style={styles.container}>
      <Text style={styles.eventName}>Lista de Participantes</Text>
      <Text style={styles.eventSubName}>lista de nomes</Text>

      <View style={styles.form}>

        <TextInput 
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6B6B6B"
          keyboardType="default"
          onChangeText={e => setParticipantName(e)}
          value={participantName}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>   +</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item}
            name={item}
            onRemove={()=>handleParticipantRemove(item)}
          />          
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>(
          <Text style={styles.listEmptyText}>
            Nenhum nome adicionado ainda na sua lista!
          </Text>
        )}  
        />

      {/* {
        participants.map( participant => (
          <Participant 
            key={participant}
            name={participant}/>
        ))
      } */}




    </View>
  )
}