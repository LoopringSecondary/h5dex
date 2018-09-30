//
//  ViewController.m
//  H5iOS
//
//  Created by ant on 2018/8/27.
//  Copyright © 2018年 com.cornerant. All rights reserved.
//

#import "ViewController.h"
#import <WebKit/WebKit.h>
#import "LoopringManager.h"

NSString *const loopingWalletURL  = @"https://h5dex.loopring.io/#/auth/tpwallet";


@interface ViewController ()<WKNavigationDelegate,WKScriptMessageHandler,WKUIDelegate>
@property (nonatomic,strong) WKWebView *webView;
@end

@implementation ViewController

- (void)viewDidLoad {
    
    [super viewDidLoad];
    
    self.view .backgroundColor =[UIColor whiteColor];
    [self configWKWebView];

    
}

- (void)configWKWebView {
    
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    config.preferences = [[WKPreferences alloc] init];
    config.preferences.minimumFontSize = 10;
    config.preferences.javaScriptEnabled = YES;
    config.preferences.javaScriptCanOpenWindowsAutomatically = NO;
    config.userContentController = [[WKUserContentController alloc] init];
    config.processPool = [[WKProcessPool alloc] init];
    
    [config.userContentController addScriptMessageHandler:self name:@"callApi"];
    
    self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds
                                      configuration:config];
    
    self.webView.UIDelegate = self;
    self.webView.navigationDelegate = self;
    NSURLRequest *requets = [NSURLRequest requestWithURL:[NSURL URLWithString:loopingWalletURL]];
    [self.webView loadRequest:requets];
    [self.view addSubview:self.webView];
}

#pragma mark - WKScriptMessageHandler

//实现js注入方法的协议方法

- (void)userContentController:(WKUserContentController *)userContentController
    
didReceiveScriptMessage:(WKScriptMessage *)message {
    
    [LoopringManager listeningWithMessage:message];
}

#pragma mark ---------  WKNavigationDelegate  --------------



- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler{
    
    
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"提示" message:message preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        completionHandler();
    }]];
    
    [self presentViewController:alert animated:YES completion:nil];
    
    
}
- (void)dealloc{
    
    [self.webView.configuration.userContentController removeScriptMessageHandlerForName:@"callApi"];
}
@end
    
