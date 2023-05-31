import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from '@react-native-firebase/database';

const Leer = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const obtenerRegistros = () => {
      firebase
        .database()
        .ref('crud')
        .on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const registrosArray = Object.values(data);
            setRegistros(registrosArray);
          }
        });
    };

    obtenerRegistros();

    return () => {
      // Limpiar el listener al desmontar el componente
      firebase.database().ref('crud').off();
    };
  }, []);

  return (
    <View>
      {registros.map((registro) => (
        <View key={registro.id}>
          <Text>Nombre del jefe de ruta: {registro.nombreJefeRuta}</Text>
          <Text>Apellidos del jefe de ruta: {registro.apellidosJefeRuta}</Text>
          <Text>Correo del jefe de ruta: {registro.correoJefeRuta}</Text>
          <Text>Contraseña del jefe de ruta: {registro.contraseñaJefeRuta}</Text>          
          <Text>Nombre del conductor: {registro.nombreConductor}</Text>
          <Text>Apellidos del conductor: {registro.apellidosConductor}</Text>
          <Text>Edad del conductor: {registro.edadConductor}</Text>
          <Text>Ruta perteneciente: {registro.rutaPerteneciente}</Text>
        </View>
      ))}
    </View>
  );
};

export default Leer;
