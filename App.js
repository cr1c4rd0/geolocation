import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState({})
  const buscaLocation = async () => {
    const { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      return Alert.alert('No tenemos los permisos necesarios para acceder a la location')
    }
    const location = await Location.getCurrentPositionAsync({})
    setLocation(location)
  }
  useEffect (() => {
    buscaLocation()
  })

  return (
    <View style={styles.container}>
     <MapView style={styles.map}>
       {location.coords
        ? <Marker
            coordinate={location.coords}
            title="Titulo"
            description="description del punto" />
        : null
       }
     </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
