import React, { useState } from 'react'
import { SafeAreaView, View, ScrollView, TextInput, Button, StyleSheet, Text } from 'react-native';


const Createdata = () => {
    const jsonUrl = 'http://192.168.239.90:3000/mahasiswa'; //API yang digunakan emulator untuk mengakses lokalhost desktop
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [kelas, setKelas] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');

    const submit = () => {
        const data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            kelas: kelas,
            gender: gender,
        };
        fetch('http://192.168.239.90:3000/mahasiswa', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', //Format data yang akan diterima oleh server dalam format JSON
                'Content-Type': 'application/json' //Memberitahu server jika data yang dikirimkan dalam format JSON
            },
            body: JSON.stringify(data)
        })

            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data tersimpan');
                setFirstName('');
                setLastName('');
                setEmail('');
                setKelas('');
                setGender('');
            })
    }

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.title}>Tambah Data Mahasiswa</Text>
                <ScrollView style={styles.form}>
                    <TextInput style={styles.input} placeholder="Nama Depan" value={first_name} onChangeText={(value) => setFirstName(value)} />
                    <TextInput style={styles.input} placeholder="Nama Belakang" value={last_name} onChangeText={(value) => setLastName(value)} />
                    <TextInput style={styles.input} placeholder="Kelas" value={kelas} onChangeText={(value) => setKelas(value)} />
                    <TextInput style={styles.input} placeholder="Jenis Kelamin" value={gender} onChangeText={(value) => setGender(value)} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(value) => setEmail(value)} />
                    <Button title="Simpan" style={styles.button} onPress={submit} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Createdata

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        padding: 10,
        marginBottom: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
    }
})

