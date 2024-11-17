import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { WebView } from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Createdata from './Createdata';
import Listdata from './Listdata';

function HomeScreen() {
  return (
    <Createdata />
  );
}

function DataMahasiswaScreen() {
  return (
    <Listdata/>
  );
}

function WebScreen() {
  return (
      <WebView
        source={{ uri: 'https://github.com/raissanrbna' }}
      />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profil" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Data Mahasiswa" component={DataMahasiswaScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserGraduate} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Github" component={WebScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGithub} size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}