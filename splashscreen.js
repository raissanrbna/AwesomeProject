import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';

// Pastikan Anda menggunakan `require` untuk memuat gambar lokal
const backgroundImage = require('./assets/c.png'); // Ganti dengan path gambar Anda

const Home = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            {/* Background Image */}
            <Image source={backgroundImage} style={styles.background} />
            <View style={styles.overlay}>
                {/* Heading */}
                <Text style={styles.heading}>
                    Selamat Datang
                </Text>
                {/* Subheading */}
                <Text style={styles.subheading}>
                    <Text style={styles.subheadingPart}>KarimunTrip </Text>
                    adalah aplikasi interaktif yang dirancang untuk mempermudah eksplorasi wisata di Karimunjawa. 
                    Aplikasi ini dilengkapi dengan fitur peta persebaran titik wisata yang memvisualisasikan lokasi-lokasi menarik secara geografis. 
                    Pengguna juga dapat menjelajahi daftar lengkap destinasi wisata yang dilengkapi dengan deskripsi dan navigasi langsung ke Google Maps untuk kemudahan perjalanan. 
                    Selain itu, aplikasi ini menyediakan fitur tambah data yang memungkinkan pengguna untuk berkontribusi dengan menambahkan informasi wisata baru, 
                    sehingga membantu memperkaya pengalaman bersama bagi semua pengguna.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3d5452',
    },
    scrollContent: {
        paddingBottom: 15, // Tambahkan ruang ekstra di bawah konten
    },
    background: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        position: 'absolute',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 320,
        paddingBottom: 50, // Tambahkan ruang di bawah teks untuk mencegah terpotong
    },
    heading: {
        fontSize: 45,
        color: '#b99668',
        fontWeight: 'bold',
        textAlign: 'left',
        textShadowColor: '#2d4442',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
    },
    subheading: {
        fontSize: 18,
        color: 'white',
        textAlign: 'justify',
        marginTop: 10,
        marginLeft: 5,
        lineHeight: 24, // Tambahkan line height agar teks mudah dibaca
    },
    subheadingPart: {
        fontSize: 30,
        lineHeight: 36, // Sesuaikan line height agar teks tidak terpotong
        color: '#b99668',
        fontWeight: 'bold',
        textShadowColor: '#2d4442',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
});

export default Home;
