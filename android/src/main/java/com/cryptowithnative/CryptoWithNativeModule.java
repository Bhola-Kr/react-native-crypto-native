package com.cryptowithnative;

import android.os.Build;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.util.Base64;

@ReactModule(name = CryptoWithNativeModule.NAME)
public class CryptoWithNativeModule extends ReactContextBaseJavaModule {
  public static final String NAME = "CryptoWithNative";

  public CryptoWithNativeModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }



    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void encryptValue(String value, String secretKey, Promise promise) {
        try {
            String key = secretKey != null ? secretKey : Base64.getEncoder().encodeToString(CryptoUtils.getPredefinedKey().getEncoded());
            String encryptedValue = CryptoUtils.encryptValue(value, key);
            promise.resolve(encryptedValue);
        } catch (Exception e) {
            promise.reject("Encryption_Error", "Encryption failed", e);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @ReactMethod
    public void decryptString(String encryptedString, String secretKey, Promise promise) {
        try {
            String key = secretKey != null ? secretKey : Base64.getEncoder().encodeToString(CryptoUtils.getPredefinedKey().getEncoded());
            String decryptedValue = CryptoUtils.decryptString(encryptedString, key);
            promise.resolve(decryptedValue);
        } catch (Exception e) {
            promise.reject("Decryption_Error", "Decryption failed", e);
        }
    }
}
