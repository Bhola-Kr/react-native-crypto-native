import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-crypto-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

interface CryptoNativeModule {
  encryptValue(valuetobeEncrypted: string, secretKey?: string): Promise<string>;
  decryptString(encryptedString: string, secretKey?: string): Promise<string>;
}

const CryptoNative: CryptoNativeModule = NativeModules.CryptoNative
  ? NativeModules.CryptoNative
  : new Proxy({} as CryptoNativeModule, {
      get() {
        throw new Error(LINKING_ERROR);
      },
    });

export async function encryptValue(
  valuetobeEncrypted: string,
  secretKey?: string
): Promise<string> {
  try {
    const encryptedText = await CryptoNative.encryptValue(
      valuetobeEncrypted,
      secretKey
    );
    return encryptedText;
  } catch (error) {
    throw new Error('Encryption failed: ' + error);
  }
}

export async function decryptString(
  encryptedString: string,
  secretKey?: string
): Promise<string> {
  try {
    const decryptedText = await CryptoNative.decryptString(
      encryptedString,
      secretKey
    );
    return decryptedText;
  } catch (error) {
    throw new Error('Decryption failed: ' + error);
  }
}
