import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firebase from '@react-native-firebase/database';

const Crear = () => {
  const [nombreJefeRuta, setNombreJefeRuta] = useState('');
  const [apellidosJefeRuta, setApellidosJefeRuta] = useState('');
  const [correoJefeRuta, setCorreoJefeRuta] = useState('');
  const [ContraseñaJefeRuta, setContraseñaJefeRuta] = useState('');
  
  const [isDriver, setIsDriver] = useState(true);
  const [nombreConductor, setNombreConductor] = useState('');
  const [apellidosConductor, setApellidosConductor] = useState('');
  const [edadConductor, setEdadConductor] = useState('');
  const [rutaPerteneciente, setRutaPerteneciente] = useState('');

  

  const agregarRegistro = () => {
    firebase.database().ref('crud').push({
      nombreJefeRuta,
      apellidosJefeRuta,
      correoJefeRuta,
      ContraseñaJefeRuta,
      isDriver,
      nombreConductor,
      apellidosConductor,
      edadConductor,
      rutaPerteneciente,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre del jefe de ruta"
        value={nombreJefeRuta}
        onChangeText={setNombreJefeRuta}
      />
      <TextInput
        placeholder="Apellidos del jefe de ruta"
        value={apellidosJefeRuta}
        onChangeText={setApellidosJefeRuta}
      />
      <TextInput
        placeholder="Correo del jefe de ruta"
        value={correoJefeRuta}
        onChangeText={setCorreoJefeRuta}
      />
      <TextInput
        placeholder="Contraseña del jefe de ruta"
        value={apellidosJefeRuta}
        onChangeText={setContraseñaJefeRuta}
      />
      <TextInput
        placeholder="Nombre del conductor"
        value={nombreConductor}
        onChangeText={setNombreConductor}
      />
      <TextInput
        placeholder="Apellidos del conductor"
        value={apellidosConductor}
        onChangeText={setApellidosConductor}
      />
      <TextInput
        placeholder="Edad del conductor"
        value={edadConductor}
        onChangeText={setEdadConductor}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Ruta a la que pertenece"
        value={rutaPerteneciente}
        onChangeText={setRutaPerteneciente}
      />
      <Button title="Crear" onPress={agregarRegistro} />
    </View>
  );
};

export default Crear;
