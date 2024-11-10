import React from 'react'
import Datamahasiswa from './data/mahasiswa.json'
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'


const Mahasiswa = () => {
    return (
        <FlatList //Looping data untuk menampilkan data mahasiswa menjadi item
            data={Datamahasiswa}
            renderItem={({ item }) => (
                <TouchableOpacity //Mendukung untuk membuka url tertentu ketika di klik
                    onPress={() => //Ketika diklik mengarah ke url google navigation
                        Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
                    <View style={styles.card}>
                        <View style={styles.avatar}>
                            <FontAwesomeIcon icon={faUserGraduate} size={35} color={item.gender == 'male' ? '#82DAEB' : '#eb82a2'} />
                        </View>
                        <View>
                            {/* Nama pengguna */}
                            <Text style = {styles.cardtitle}>{item.first_name} {item.last_name}</Text>

                            {/* Ikon dan teks gender */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                <FontAwesomeIcon
                                    icon={item.gender === 'male' ? faMars : faVenus}
                                    color={item.gender === 'male' ? '#82DAEB' : '#eb82a2'}
                                    size={15}
                                />
                                <Text style={{ marginLeft: 5 }}>{item.gender === 'male' ? 'Male' : 'Female'}</Text>
                            </View>

                            {/* Kelas dan lokasi */}
                            <Text> Kelas: {item.class}</Text>
                            <Text>{item.latitude}, {item.longitude}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />

    )
}

export default Mahasiswa

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 50,
    },
    cardtitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#FFECC8',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7
    },
})
