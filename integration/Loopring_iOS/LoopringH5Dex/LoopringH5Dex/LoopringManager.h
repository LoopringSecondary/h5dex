//
//  LoopringManager.h
//  QBao
//
//  Created by ant on 2018/8/29.
//  Copyright © 2018年 aethercoder. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>
@interface LoopringManager : NSObject
+(void)listeningWithMessage:(WKScriptMessage *)message;

@end
