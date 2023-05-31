import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import firebase from '@react-native-firebase/database';

const Actualizar = () => {
  const [id, setId] = useState('');
  const [nombreJefeRuta, setNombreJefeRuta] = useState('');
  const [apellidosJefeRuta, setApellidosJefeRuta] = useState('');
  const [correoJefeRuta, setCorreoJefeRuta] = useState('')
  const [contraseñaJefeRuta, setContraseñaJefeRuta] = useState('');
  const [nombreConductor, setNombreConductor] = useState('');
  const [apellidosConductor, setApellidosConductor] = useState('');
  const [edadConductor, setEdadConductor] = useState('');
  const [rutaPerteneciente, setRutaPerteneciente] = useState('');

  const obtenerRegistro = () => {
    firebase
      .database()
      .ref(`crud/${id}`)
      .once('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setNombreJefeRuta(data.nombreJefeRuta);
          setApellidosJefeRuta(data.apellidosJefeRuta);
          setCorreoJefeRuta(data.correoJefeRuta);
          setContraseñaJefeRuta(data.contraseñaJefeRuta);
          setNombreConductor(data.nombreConductor);
          setApellidosConductor(data.apellidosConductor);
          setEdadConductor(data.edadConductor.toString());
          setRutaPerteneciente(data.rutaPerteneciente);
        }
      });
  };

  const actualizarRegistro = () => {
    firebase.database().ref(`crud/${id}`).set({
      nombreJefeRuta,
      apellidosJefeRuta,
      correoJefeRuta,
      contraseñaJefeRuta,
      nombreConductor,
      apellidosConductor,
      edadConductor,
      rutaPerteneciente,
    });
  };

  return (
    <View>
      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <Button title="Obtener Registro" onPress={obtenerRegistro} />
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
        value={contraseñaJefeRuta}
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
      <Button title="Actualizar" onPress={actualizarRegistro} />
    </View>
  );
};

export default Actualizar;
