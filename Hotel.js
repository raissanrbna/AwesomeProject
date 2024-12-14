import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView, View, ScrollView, TextInput, Image, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Createdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/wisata';
    const [nama_wisata, setNamaWisata] = useState('');
    const [jam_operasional, setJamOperasional] = useState('');
    const [htm, setHTM] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Deklarasi default

    // Fetch data saat pertama kali render
    useEffect(() => {
        refreshPage();
    }, []);

    const refreshPage = () => {
        setRefresh(true);
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setRefresh(false));
    };

    const createData = () => {
        const data = {
            nama_wisata,
            jam_operasional,
            htm,
            latitude,
            longitude,
            image_url,
        };

        fetch(jsonUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                alert('Data tersimpan');
                setNamaWisata('');
                setJamOperasional('');
                setHTM('');
                setLatitude('');
                setLongitude('');
                setImageUrl('');
                refreshPage();
            });
    };

    const submitData = () => {
        if (!selectedUser) {
            alert('Pilih data untuk diedit terlebih dahulu.');
            return;
        }

        const data = {
            nama_wisata,
            jam_operasional,
            htm,
            latitude,
            longitude,
            image_url,
        };

        fetch(`${jsonUrl}/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then(() => {
                alert('Data berhasil diperbarui');
                setNamaWisata('');
                setJamOperasional('');
                setHTM('');
                setLatitude('');
                setLongitude('');
                setImageUrl('');
                refreshPage();
            });
    };

    const selectItem = (item) => {
        setSelectedUser(item);
        setNamaWisata(item.nama_wisata);
        setJamOperasional(item.jam_operasional);
        setHTM(item.htm);
        setLatitude(item.latitude);
        setLongitude(item.longitude);
        setImageUrl(item.image_url);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Form Input Data</Text>

                    <View style={styles.inputCard}>
                        <Text style={styles.inputLabel}>Nama Destinasi Wisata</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Masukkan nama wisata"
                            placeholderTextColor="#A5C9CA"
                            value={nama_wisata}
                            onChangeText={(value) => setNamaWisata(value)}
                        />
                    </View>

                    <View style={styles.inputCard}>
                        <Text style={styles.inputLabel}>Jam Operasional</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Contoh: 08:00 - 17:00"
                            placeholderTextColor="#A5C9CA"
                            value={jam_operasional}
                            onChangeText={(value) => setJamOperasional(value)}
                        />
                    </View>

                    <View style={styles.inputCard}>
                        <Text style={styles.inputLabel}>HTM</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Masukkan harga tiket masuk"
                            placeholderTextColor="#A5C9CA"
                            keyboardType="numeric"
                            value={htm}
                            onChangeText={(value) => setHTM(value)}
                        />
                    </View>

                    <View style={styles.inputCard}>
                        <Text style={styles.inputLabel}>Latitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Latitude lokasi"
                            placeholderTextColor="#A5C9CA"
                            keyboardType="numeric"
                            value={latitude}
                            onChangeText={(value) => setLatitude(value)}
                        />
                    </View>

                    <View style={styles.inputCard}>
                        <Text style={styles.inputLabel}>Longitude</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Longitude lokasi"
                            placeholderTextColor="#A5C9CA"
                            keyboardType="numeric"
                            value={longitude}
                            onChangeText={(value) => setLongitude(value)}
                        />
                    </View>

                    <View style={styles.inputCard}>
                        <Text style={styles.inputLabel}>URL Gambar</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Masukkan URL gambar"
                            placeholderTextColor="#A5C9CA"
                            value={image_url}
                            onChangeText={(value) => setImageUrl(value)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={createData}>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={submitData}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        data={dataUser}
                        refreshing={refresh}
                        onRefresh={refreshPage}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => selectItem(item)}>
                                <View style={styles.card2}>
                                    <Image source={{ uri: item.image_url }} style={styles.avatar} resizeMode="cover" />
                                    <View>
                                        <Text style={styles.cardTitle2}>{item.nama_wisata}</Text>
                                        <Text style={styles.cardText2}>Jam: {item.jam_operasional} WIB</Text>
                                        <Text style={styles.cardText2}>HTM: {item.htm}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Createdata;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d4442',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
    },
    card: {
        backgroundColor: '#0c322c',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#b99668',
        marginBottom: 10,
        textAlign: 'center'
    },
    inputCard: {
        marginBottom: 15,
    },
    inputLabel: {
        color: '#b99668',
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#1e3d3a',
        color: '#E0E0E0',
        padding: 10,
        borderRadius: 8,
    },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between', // Atur jarak antar tombol
          marginTop: 10,
        },
        button: {
          backgroundColor: '#b99668',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          flex: 1, // Tambahkan agar lebar tombol proporsional
          marginHorizontal: 5, // Memberi jarak horizontal antar tombol
        },
        buttonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginBottom: 10,
    },
    cardText: {
        color: '#b99668',
        fontSize: 14,
    },


    safeArea: {
        flex: 1,
        backgroundColor: '#2d4442',
    },
    loadingContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    listContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#b99668',
        textAlign: 'center',

    },
    card2: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 15,
        marginVertical: 8,
    },
    cardTitle2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 30,
    },
    cardText2: {
        fontSize: 14,
        color: '#555',
        marginLeft: 30,
    },
    cardArrow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    form: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    flatList: {
        paddingTop: 10,
    },
});




