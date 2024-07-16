import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { encryptValue, decryptString } from 'react-native-crypto-with-native';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = async () => {
    try {
      const encrypted = await encryptValue(inputText);
      console.log('handleEncrypt -> encrypted', encrypted);
      setEncryptedText(encrypted);
    } catch (error) {
      Alert.alert('Encryption Error', '' + error);
    }
  };

  const handleDecrypt = async () => {
    try {
      const decrypted = await decryptString(encryptedText);
      setDecryptedText(decrypted);
    } catch (error) {
      Alert.alert('Decryption Error', '' + error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text to encrypt"
        onChangeText={setInputText}
        value={inputText}
      />
      <Button title="Encrypt" onPress={handleEncrypt} />
      <Text style={styles.result}>Encrypted Text: {encryptedText}</Text>
      <Button title="Decrypt" onPress={handleDecrypt} />
      <Text style={styles.result}>Decrypted Text: {decryptedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 300,
    marginBottom: 20,
  },
  result: {
    marginVertical: 20,
  },
});

export default App;
