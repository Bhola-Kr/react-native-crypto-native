@objc(CryptoNative)
class CryptoNative: NSObject {
    @objc(encryptValue:withSecretKey:withResolver:withRejecter:)
     func encryptValue(value: String, secretKey: String?, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
         do {
             let key = secretKey ?? CryptoUtils.getPredefinedKey().base64EncodedString()
             let encryptedValue = try CryptoUtils.encryptValue(value, secretKey: key)
             resolve(encryptedValue)
         } catch {
             reject("Encryption_Error", "Encryption failed", error)
         }
     }
     
     @objc(decryptString:withSecretKey:withResolver:withRejecter:)
     func decryptString(_ encryptedString: String, secretKey: String?, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
         do {
             let key = secretKey ?? CryptoUtils.getPredefinedKey().base64EncodedString()
             let decryptedValue = try CryptoUtils.decryptString(encryptedString, secretKey: key)
             resolve(decryptedValue)
         } catch {
             reject("Decryption_Error", "Decryption failed", error)
         }
     }
}
