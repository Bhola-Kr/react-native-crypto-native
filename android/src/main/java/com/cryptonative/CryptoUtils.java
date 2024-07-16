package com.cryptonative;

import android.os.Build;

import androidx.annotation.RequiresApi;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class CryptoUtils {

    @RequiresApi(api = Build.VERSION_CODES.O)
    public static String encryptValue(String value, String secretKey) throws Exception {
        byte[] keyData = Base64.getDecoder().decode(secretKey);
        SecretKeySpec secretKeySpec = new SecretKeySpec(keyData, "AES");
        byte[] iv = getFixedIV();
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);
        cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, gcmSpec);

        byte[] encryptedBytes = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } else {
            return android.util.Base64.encodeToString(encryptedBytes, android.util.Base64.DEFAULT);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public static String decryptString(String encryptedString, String secretKey) throws Exception {
        byte[] keyData = Base64.getDecoder().decode(secretKey);
        SecretKeySpec secretKeySpec = new SecretKeySpec(keyData, "AES");
        byte[] iv = getFixedIV();
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, gcmSpec);

        byte[] decodedBytes;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            decodedBytes = Base64.getDecoder().decode(encryptedString);
        } else {
            decodedBytes = android.util.Base64.decode(encryptedString, android.util.Base64.DEFAULT);
        }
        byte[] original = cipher.doFinal(decodedBytes);
        return new String(original, StandardCharsets.UTF_8);
    }

    public static byte[] getFixedIV() {
        // This should be a 12-byte array for GCM mode
        return new byte[]{0x00, 0x01, 0x02, 0x03, 0x18, 0x19, 0x1A, 0x1B, 0x1F, 0x1D, 0x1E, 0x1F};
    }

    public static SecretKey getPredefinedKey() {
        // This is a 256-bit key (32 bytes)
        byte[] keyData = new byte[]{
                0x0F, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
                0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
                0x18, 0x19, 0x1A, 0x1B, 0x1F, 0x1D, 0x1E, 0x1F
        };
        return new SecretKeySpec(keyData, "AES");
    }
}
