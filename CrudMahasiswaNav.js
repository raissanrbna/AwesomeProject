import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faHome, faCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import Splashscreen from './splashscreen';
import Createdata from './Createdata';
import Listdata from './Listdata';
import Hotel from './Hotel';
import Profil from './App';
import { WebView } from 'react-native-webview';

const webmap = require('./map.html');

function HomeScreen() {
  return <Splashscreen />;
}
function CreateScreen() {
  return <Createdata />;
}
function ListWisataScreen() {
  return <Listdata />;
}
function HotelScreen() {
  return <Hotel />;
}
function ProfilScreen() {
  return <Profil />;
}
function MapsScreen() {
  return <WebView source={webmap} />;
}

const Tab = createBottomTabNavigator();

// Custom Add Button (Tengah)
const CustomAddButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.addButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    {children}
  </TouchableOpacity>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          headerStyle: {
            backgroundColor: '#fad089', // Warna header
          },
          headerTintColor: '#fff', // Warna teks di header
          headerTitleAlign: 'center', // Judul di tengah
        }}
      >
        {/* Splashscreen tanpa header */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false, // Nonaktifkan header hanya untuk Splashscreen
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHome} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapsScreen}
          options={{
            headerTitle: 'PERSEBARAN WISATA KARIMUNJAWA',
            tabBarLabel: 'Map',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMap} size={20} color={color} />
            ),
            headerStyle: {
              backgroundColor: '#2d4442', // Warna background header khusus untuk screen "Map"
            },
            headerTitleStyle: {
              fontSize: 20, // Ukuran font judul
              fontWeight: 'bold', // Teks tebal
              color: '#b99668', // Warna teks judul
            },
          }}
        />

        <Tab.Screen
          name="Tambah"
          component={CreateScreen}
          options={{
            headerShown: false,
            headerTitle: 'Tambah Data',
            tabBarLabel: '',
            tabBarButton: (props) => (
              <CustomAddButton {...props}>
                <FontAwesomeIcon icon={faCirclePlus} size={30} color="#fff" />
              </CustomAddButton>
            ),
          }}
        />
        <Tab.Screen
          name="Wisata"
          component={ListWisataScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faList} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfilScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addButton: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b99668',
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row', // Align text and icon horizontally
    padding: 5, // Optional: adjust padding if needed
  },
  addButtonText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5, // Adjust distance between icon and text
    alignSelf: 'center', // Vertically align the text with the icon
  },
});
