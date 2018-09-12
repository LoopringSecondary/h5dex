# Integration with Loopring H5Dex

Loopring H5Dex is an out-of-the-box embeddable decentralized exchange based on HTML5 and React. It integrates with Loopring Protocol on the backend and provides full trading and transaction functionalities. We also implement the features of asset browsing and ETH/WETH conversions. Loopring H5Dex can be easily integrated into iOS and Android apps, third-party wallets and dApp browsers. The demo project code is open-sourced and available.

H5Dex link for partners to integrate with : <https://h5dex.loopr.io/#/auth/tpwallet>

[Chinese Document[中文文档]](chinese.md)

## **Interactive API**

1.  device.getCurrentLanguage 

   This method gets the user’s current language setting, and currently H5Dex supports Chinese and English. The default value is English. Available locale: zh-CN 、en-US. 

2. device.getCurrentCurrency

   This method gets the user’s current currency setting. H5Dex displays price and asset volume based on the currency setting. The default value is USD. Available currency: CNY、USD.

3.  user.getCurrentAccount 

   This method gets user’s current address.

4. message.sign

This method calculates an Ethereum specific signature with: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`. and same as web3.eth.sign.

5. transaction.sign

This method displays the Ethereum tx for the user to sign and it should support hexadecimal digits and decimal digits. In general, we deliver hexadecimal digits.

## **Interaction Guideline**

```
{
 "method": "user.getCurrentAccount",
 "data": null,
 "callback":"callback_1535945947888_74da5fe44b03f5a”
}
```

- method: the method that H5Dex requires app to register.
- data: the required parameters that H5Dex returns to app; data is null if there is no required parameter.
- callback: the callback function that app returns the result to H5Dex. The structures of callback result are as follows: json string {error:{message:"",errorCode:001}}  or  {result：""}.

## **Interaction Program**

Note：The window in iOS and Android apps is a global window object you can access from H5Dex, and app developers only need to focus on the registration of the related window object and method. 

- iOS app integration is based on WKWebView and user registers and listens to callApi. Parameters will be returned to H5Dex if it succeeds. Please use as follows: window.webkit.messageHandlers.callApi

 For more information about the detailed settings, please refer to Demo code. (Objective-C refers to Demo and Swift refers to our [Loopr-iOS code](https://github.com/Loopring/loopr-ios/tree/master/loopr-ios/H5Dex)):

```
LoopringManager,
ViewController
```

- Android app integration requires developers to register an object named android. This object has the callApi method to access to API gateway. Please use as follows: window.android.callApi

To find out more information, please refer to Demo:

```
MainActivity
TPWallet
```

