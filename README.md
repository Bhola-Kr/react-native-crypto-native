# React Native Crypto Library

A React Native library for AES encryption and decryption using predefined or custom secret keys.

## Installation

### Using npm

```bash
npm install react-native-crypto-native
```

### Using yarn

```bash
yarn add react-native-crypto-native
```

### Linking

For React Native 0.60 and above, the library should automatically be linked. For older versions, you might need to link it manually.

```bash
react-native link react-native-crypto-native
```

## Setup for Android

1. Add the following lines to `android/settings.gradle`:

```gradle
include ':react-native-crypto-native'
project(':react-native-crypto-native').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-crypto-native/android')
```

2. Add the following dependency to `android/app/build.gradle`:

```gradle
dependencies {
    implementation project(':react-native-crypto-native')
}
```

3. Add the import and package declaration in `MainApplication.java`:

```java
import com.yourpackage.CryptoNativePackage; // <- Add this import

public class MainApplication extends Application implements ReactApplication {

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new CryptoNativePackage() // <- Add this line
    );
  }
}
```

## Usage

### Import the Library

```javascript
import { NativeModules } from 'react-native';
const { CryptoNative } = NativeModules;
```

### Encrypt a Value

```javascript
const valueToEncrypt = 'Hello, World!';
const secretKey = 'your-optional-secret-key'; // Pass null or undefined to use predefined key

CryptoNative.encryptValue(valueToEncrypt, secretKey)
  .then((encryptedValue) => {
    console.log('Encrypted Value:', encryptedValue);
  })
  .catch((error) => {
    console.error('Encryption Error:', error);
  });
```

### Decrypt a Value

```javascript
const encryptedValue = 'your-encrypted-value';
const secretKey = 'your-optional-secret-key'; // Pass null or undefined to use predefined key

CryptoNative.decryptString(encryptedValue, secretKey)
  .then((decryptedValue) => {
    console.log('Decrypted Value:', decryptedValue);
  })
  .catch((error) => {
    console.error('Decryption Error:', error);
  });
```

### Get Predefined Key

```javascript
CryptoNative.getPredefinedKey()
  .then((predefinedKey) => {
    console.log('Predefined Key:', predefinedKey);
  })
  .catch((error) => {
    console.error('Error Getting Predefined Key:', error);
  });
```

## Methods

### `encryptValue(value: string, secretKey?: string): Promise<string>`

Encrypts the provided value using the provided secret key or the predefined key if no key is provided.

### `decryptString(encryptedString: string, secretKey?: string): Promise<string>`

Decrypts the provided encrypted string using the provided secret key or the predefined key if no key is provided.

### `getPredefinedKey(): Promise<string>`

Returns the predefined secret key.

## License

MIT

```

Replace `"react-native-crypto-native"` with the actual name of your library, and ensure the paths and package names are correctly specified according to your project structure. This `README.md` provides a basic overview and instructions for using your React Native crypto library.
```
