import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-crypto-with-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

interface CryptoNativeModule {
  encryptValue(valuetobeEncrypted: string, secretKey?: string): Promise<string>;
  decryptString(encryptedString: string, secretKey?: string): Promise<string>;
}

const CryptoWithNative: CryptoNativeModule = NativeModules.CryptoWithNative
  ? NativeModules.CryptoWithNative
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
    const encryptedText = await CryptoWithNative.encryptValue(
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
    const decryptedText = await CryptoWithNative.decryptString(
      encryptedString,
      secretKey
    );
    return decryptedText;
  } catch (error) {
    throw new Error('Decryption failed: ' + error);
  }
}
