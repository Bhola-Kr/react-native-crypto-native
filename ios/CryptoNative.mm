#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CryptoNative, NSObject)

RCT_EXTERN_METHOD(encryptValue:(NSString *)value withSecretKey:(NSString *)secretKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(decryptString:(NSString *)encryptedString withSecretKey:(NSString *)secretKey
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
