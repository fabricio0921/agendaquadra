import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';


const Agendar = () => {
    const uri2 = 'https://meuapp.webcindario.com/cadastrar.php';
    const [solicited, setSolicited] = useState('');
    const [selectedSport, setSelectedSport] = useState();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const cadastra2 = () => {
        fetch('https://meuapp.webcindario.com/cadastrar.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "solicited": solicited, "selectedSport": selectedSport, "selectedDate": selectedDate
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
    }


    const cadastrar = async () => {
        try {
            const resp = await fetch(uri2, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "solicited": solicited, "selectedSport": selectedSport, "selectedDate": selectedDate })
            })
            const json = await resp.json()
            Alert.alert({ usuario: json });
            Alert.alert('cadastrado!');

        } catch (e) {
            console.log(e.message)
        }
    }

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };
    console.log(selectedDate)
    console.log(selectedSport)
    console.log(solicited)


    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    padding: 20,
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <TextInput placeholder='Nome do Solicitante' style={styles.input} onChangeText={text => setSolicited(text)} />
                <Picker
                    style={styles.picker}
                    selectedValue={selectedSport}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedSport(itemValue)
                    }>
                    <Picker.Item label="Volei" value="Volei" />
                    <Picker.Item label="Futsal" value="Futsal" />
                    <Picker.Item label="Basquete" value="Basquete" />
                    <Picker.Item label="Outro" value="Outro" />


                </Picker>


                <TouchableOpacity onPress={showDatePicker} style={styles.toSave}>
                    <Image
                        style={styles.stretch}
                        source={require('./data.png')}

                    />
                </TouchableOpacity>

                <DateTimePickerModal
                    date={selectedDate}
                    isVisible={datePickerVisible}
                    mode="datetime"
                    is24Hour
                    locale="pt-br"
                    dateFormat="dd/MM/yyyy"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}

                />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    margin: 1,
                    padding: 10,
                    backgroundColor: "#f0eeee",
                    borderRadius: 5,
                    marginTop: 20
                }}>
                    O seu evento será marcado no dia {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                    , {selectedDate ? selectedDate.toLocaleTimeString() : 'No date selected'} para {solicited}
                </Text>

                <TouchableOpacity style={styles.btSalvar} onPress={() => cadastra2()}>
                    <Text style={styles.textSalvar}>SALVAR</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


    },
    TiNome: {
        width: '90%',
        height: 50,
        backgroundColor: 'grey',
        margin: 20
    },
    input: {
        width: '90%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#084B8A'
    },
    picker: {
        width: '90%',
        marginTop: 20,


    },
    btSalvar: {
        width: '90%',
        height: 50,
        backgroundColor: '#084B8A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 20,

    },
    stretch: {
        width: 100,
        height: 100,
        margin: 20,

    },
    textSalvar: {
        color: 'white'
    }
});
export default Agendar;