import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { encryptValue, decryptString } from 'react-native-crypto-native';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, width: 300, marginBottom: 20 }}
        placeholder="Enter text to encrypt"
        onChangeText={setInputText}
        value={inputText}
      />
      <Button title="Encrypt" onPress={handleEncrypt} />
      <Text style={{ marginVertical: 20 }}>
        Encrypted Text: {encryptedText}
      </Text>
      <Button title="Decrypt" onPress={handleDecrypt} />
      <Text style={{ marginVertical: 20 }}>
        Decrypted Text: {decryptedText}
      </Text>
    </View>
  );
};

export default App;
