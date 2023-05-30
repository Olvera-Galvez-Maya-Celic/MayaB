import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import firebase from '@react-native-firebase/database';
import MapView, { Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const GuardarRecorrido = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let watchId;

    const obtenerUbicacion = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          setLocations((prevLocations) => [...prevLocations, newLocation]);
          guardarUbicacionFirebase(latitude, longitude);
        },
        (error) => {
          console.log('Error al obtener la ubicación', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { latitude, longitude };
        setLocations((prevLocations) => [...prevLocations, newLocation]);
        guardarUbicacionFirebase(latitude, longitude);
      },
      (error) => {
        console.log('Error al obtener la ubicación', error);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const guardarUbicacionFirebase = (latitude, longitude) => {
    const ubicacionRef = firebase.database().ref('RutasC');
    ubicacionRef.push({
      latitude,
      longitude,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polyline
          coordinates={locations}
          strokeColor="#FF0000"
          strokeWidth={3}
        />
      </MapView>
      <Button title="Iniciar Recorrido" onPress={obtenerUbicacion} />
    </View>
  );
};

export default GuardarRecorrido;
