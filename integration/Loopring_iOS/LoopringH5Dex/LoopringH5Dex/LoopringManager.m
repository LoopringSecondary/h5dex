//
//  LoopringManager.m
//  QBao
//
//  Created by ant on 2018/8/29.
//  Copyright © 2018年 aethercoder. All rights reserved.
//

#import "LoopringManager.h"
@implementation LoopringManager



+(void)listeningWithMessage:(WKScriptMessage *)message{
    
    if (![message.name isEqualToString:@"callApi"]) {
        return;
    }
    NSLog(@"loopring log\n__________\n%@\n%@\n",message.name,message.body);
    NSDictionary *loopingInfo = [self dictionaryWithJsonString:message.body];
    NSString *method = loopingInfo[@"method"];
    NSDictionary *params = loopingInfo[@"data"];
    NSString *callback = loopingInfo[@"callback"];
    NSDictionary *loopringRestult = @{}.mutableCopy;
    if ([method isEqualToString:@"user.getCurrentAccount"]) { // ETH地址
        
        loopringRestult = @{
                            @"result" : @"your eth address",
                            };
        
    }else if ([method isEqualToString:@"device.getCurrentLanguage"]){ // 语言
        
        // 根据自己APP的语言选择 @"zh-CN": @"en-US"
        loopringRestult = @{
                            @"result" : @"zh-CN"
                            };
        
    }else if ([method isEqualToString:@"device.getCurrentCurrency"]){ // 货币种类
        // 根据需求选择货币单位 @"CNY": @"USD"
        loopringRestult = @{
                            @"result" : @"CNY"
                            };

    }else if ([method isEqualToString:@"message.sign"]){ // message.sign
        
        // 根据以下两个参数签名
        NSString *signMessage = params[@"message"];
        NSString *signAddress = params[@"address"];
        NSString *sign = @"your sign";
        
        loopringRestult = @{
                            @"result" : sign
                            };
    }else if ([method isEqualToString:@"transaction.sign"]){ // transaction
        
        NSString *gasLimit = params[@"gasLimit"];
        NSString *data = params[@"data"];
        NSString *to = params[@"to"];
        NSString *gasPrice = params[@"gasPrice"];
        NSString *chainId = params[@"chainId"];
        NSString *nonce = params[@"nonce"];
        NSString *value = params[@"value"];
        
        // 根据以上参数进行txHash签名
        NSString *txHash = @"your txHash";
        loopringRestult = @{
                            @"result" : txHash
                            };
    }
    
    // 执行JS脚本
    NSString *jsString = [NSString stringWithFormat:@"%@(%@)",callback,[self jsonStringWithDictionary:loopringRestult]];
    NSLog(@"即将执行的JS脚本=====\n%@\n",jsString);

    [message.webView evaluateJavaScript:jsString completionHandler:^(id _Nullable res, NSError * _Nullable error) {
        
        if (!error) {
            NSLog(@"JS脚本执行成功");
        }

    }];
    
    
}

// JSON -> Dict
+ (NSDictionary *)dictionaryWithJsonString:(NSString *)jsonString
{
    if (jsonString == nil) {
        return nil;
    }
    
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingMutableContainers
                                                          error:&err];
    if(err)
    {
        NSLog(@"json解析失败：%@",err);
        return nil;
    }
    return dic;
}

// Dict -> JSON
+ (NSString *)jsonStringWithDictionary:(NSDictionary *)dict{
    NSData *data = [NSJSONSerialization dataWithJSONObject:dict
                                                   options:NSJSONWritingPrettyPrinted
                                                     error:nil];
    
    if (data == nil) {
        return nil;
    }
    
    NSString *string = [[NSString alloc] initWithData:data
                                             encoding:NSUTF8StringEncoding];
    return string;
}

@end
