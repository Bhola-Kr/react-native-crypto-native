import Foundation
import CryptoKit

class CryptoUtils {
    
    static func encryptValue(_ value: String, secretKey: String) throws -> String {
        let keyData = Data(base64Encoded: secretKey)!
        let secretKey = SymmetricKey(data: keyData)
        let iv = getFixedIV()
        let dataToEncrypt = value.data(using: .utf8)!
        
        let sealedBox = try AES.GCM.seal(dataToEncrypt, using: secretKey, nonce: AES.GCM.Nonce(data: iv))
        let encryptedData = sealedBox.ciphertext + sealedBox.tag
        
        return encryptedData.base64EncodedString()
    }
    
    static func decryptString(_ encryptedString: String, secretKey: String) throws -> String {
        let keyData = Data(base64Encoded: secretKey)!
        let secretKey = SymmetricKey(data: keyData)
        let iv = getFixedIV()
        let encryptedData = Data(base64Encoded: encryptedString)!
        let tagRange = encryptedData.index(encryptedData.endIndex, offsetBy: -16)..<encryptedData.endIndex
        let tag = encryptedData[tagRange]
        let ciphertext = encryptedData[..<tagRange.lowerBound]
        
        let sealedBox = try AES.GCM.SealedBox(nonce: AES.GCM.Nonce(data: iv), ciphertext: ciphertext, tag: tag)
        let decryptedData = try AES.GCM.open(sealedBox, using: secretKey)
        
        guard let decryptedString = String(data: decryptedData, encoding: .utf8) else {
            throw CryptoError.decryptionFailed
        }
        return decryptedString
    }
    
    static func getPredefinedKey() -> Data {
        // This is a 256-bit key (32 bytes)
        let keyData = Data([0x0F, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
                            0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
                            0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
                            0x18, 0x19, 0x1A, 0x1B, 0x1F, 0x1D, 0x1E, 0x1F])
        return keyData
    }
    
    private static func getFixedIV() -> Data {
        // This should be a 12-byte array for GCM mode
        return Data([0x00, 0x01, 0x02, 0x03, 0x18, 0x19, 0x1A, 0x1B, 0x1F, 0x1D, 0x1E, 0x1F])
    }
    
    enum CryptoError: Error {
        case decryptionFailed
    }
}
