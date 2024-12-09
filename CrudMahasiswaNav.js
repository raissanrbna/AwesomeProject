import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faUserGraduate } from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import { faMap } from '@fortawesome/free-regular-svg-icons';

import { WebView } from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Createdata from './Createdata';
import Listdata from './Listdata';
import { faCirclePlus, faUserPen } from '@fortawesome/free-solid-svg-icons';
import EditData from './Editdata'


const webmap = require('./map.html');
const form = require('./form.html');



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

function EditScreen() {
  return (
    <EditData/>
  );
}

function ProfilScreen() {
  return (
    <Profil/>
  );
}

// function MapsScreen() {
//   return (
//       <WebView source={webmap}/>
     
//   );
// }

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Tambah" component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faCirclePlus} size={20} color={color} />
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
        <Tab.Screen name="Edit" component={EditScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserPen} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen name="Profil" component={ProfilScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} size={20} color={color} />
            ),
          }}
        />
        {/* <Tab.Screen name="Map" component={MapsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMap} size={20} color={color} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}