import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert, Linking, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'

const Listdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/wisata';
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    function refreshPage() {
        setRefresh(true);
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setRefresh(false));
    }

    function deleteData(id) {
        fetch(`${jsonUrl}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                Alert.alert('Berhasil', 'Data berhasil dihapus.');
                refreshPage();
            })
            .catch((error) => console.error(error));
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.cardTitle}>Loading...</Text>
                </View>
            ) : (
                <View style={styles.listContainer}>

                    {/* Judul */}
                    <Text style={styles.sectionTitle}>DAFTAR DESTINASI WISATA </Text>
                    <FlatList
                        style={styles.flatList}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        data={dataUser}
                        onRefresh={refreshPage}
                        refreshing={refresh}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(
                                            `google.navigation:q=${item.latitude},${item.longitude}`
                                        )
                                    }
                                >
                                    <View style={styles.card}>
                                        <Image
                                            source={{ uri: item.image_url }}
                                            style={styles.avatar}
                                            resizeMode="cover"
                                        />
                                        <View>
                                            <Text style={styles.cardTitle}>{item.nama_wisata}</Text>
                                            <Text style={styles.cardText}>
                                                Jam: {item.jam_operasional} WIB
                                            </Text>
                                            <Text style={styles.cardText}>HTM: {item.htm}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <FontAwesomeIcon icon={faAnglesRight} size={20} style={{ color: '#b99668' }} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.form}>
                                    <Button
                                        title="Hapus"
                                        onPress={() =>
                                            Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                                                { text: 'Tidak', onPress: () => console.log('Tidak') },
                                                { text: 'Ya', onPress: () => deleteData(item.id) },
                                            ])
                                        }
                                        color={'#b99668'}
                                    />
                                </View>
                            </View>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Listdata;

const styles = StyleSheet.create({
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
        marginVertical: 15,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
    },
    cardText: {
        fontSize: 14,
        color: '#555',
    },
    avatar: {
        borderRadius: 10,
        width: 100,
        height: 100,
        marginRight: 20,
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 15,
        marginVertical: 8,
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
