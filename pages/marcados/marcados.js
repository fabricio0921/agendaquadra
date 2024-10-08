import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Text, View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Button, Alert } from 'react-native';


// import { Container } from './styles';

const Marcados = () => {
    
    const [data, setData] = useState([]);
    const getMoviesFromApi = () => {
        fetch('https://meuapp.webcindario.com/requisicao.php')
            .then((response) => response.json())
            .then(data => setData(data))
            .then((json) => console.log(json));

           
    };

    useEffect(() => {
        getMoviesFromApi();
    }, []);
    return (
        <View style={styles.container}>

            <FlatList
                style={styles.flatResults}
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (

                    <TouchableOpacity style={styles.toResultados} onPress={()=>Alert.alert(item.datahora)}>
                        <Text>NOME: {item.nome}</Text>
                        <Text>Modaleidade:{item.modalidade}</Text>

                        <Text>Data:{item.horamarca}</Text>
                        <Text>Data:{item.datahora}</Text>


                        


                    </TouchableOpacity>
                    



                )}
            />


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'


    },
    flatResults: {
        width: "100%",
        height: '100%',

        flex: 1
    },
    txtResultados: {
        color: 'red'
    },
    toResultados: {
        width: '90%',
        height: 100,
        backgroundColor: "#B0C4DE",
        margin: 5,

    }

});

export default Marcados;