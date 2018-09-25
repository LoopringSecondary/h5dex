#Loopring H5dex 集成方法

Loopring H5dex是一款基于react实现的h5版的去中心化交易所，深度集成了loopring协议，拥有完整的交易功能，同时支持查看资产，WETH与ETH互转。Loopring h5dex 针对IOS和Android的APP集成做了封装，方便第三方钱包方便的集成，同时我们提供IOS集成和Andorid集成的demo项目代码。

h5dex 第三方集成链接：<https://h5dex.loopr.io/#/auth/tpwallet>


## H5dex与App交互Api 接口
1. device.getCurrentLanguage
   获取当前用户设置的语言的api接口，⽬前h5dex⽀持中⽂和英⽂。如果APP无法正确返回，默认设为英文。 
   可⽤的 locale:zh-CN 、en-US
2. device.getCurrentCurrency
   提供当前⽤户设置的货币单位的接口，h5dex 根据获取的货币类型，决定在h5dex中价格和资产以相应的单位进行显示。如果无法正确返回，默认设置美元。
    可用的 currency:CNY、USD
3. user.getCurrentAccount
   需要提供⼀个获取当前⽤户地址的api接口。
4. message.sign
   需要提供一个获取对message签名的接⼝，该接⼝的功能与web3.eth.sign 一样。
5. transaction.sign
   提供⼀个获取对以太坊tx进行签名的接口。数量的设置应该支持16进制字符或者10进制字符。通常情况下，我们会传递16进制字符串。

## h5dex 与App交互规范

```js
{
	"method": "user.getCurrentAccount",
	"data": null,
	"callback":"callback_1535945947888_74da5fe44b03f5a"
}
```

- method: H5Dex需要App注册的方法
- data:H5Dex传给APP的对应方法需要的参数，无需参数则data为null
- callback:APP回传结果给H5Dex需要回调的函数名称，回调结果的参数结构为json string
  {error:{message:"",errorCode:001}} 或者{result：""}

## h5dex 与App交互方案

注：IOS和Android实例中的window为h5dex的全局window对象，App只需关注注册对应要求的对象和方法即可。

- IOS的集成方法采用WKWebView实现，在WKWebView实例内注册监听"callApi"方法,监听成功后,H5Dex会回传参数。具体的实例如下:window.webkit.messageHandlers.callApi

  详细设置请参考Demo中的实现（Demo为OC实现，Swift实现可以参考我们[Loopr-IOS代码](https://github.com/Loopring/loopr-ios/tree/master/loopr-ios/H5Dex)）:

  ```
  LoopringManager,
  ViewController 
  ```

- Andorid的集成方法，要求Andorid App注册一个名称为android的实例，实现callApi方法来处理对应的Api接口。具体实例如下：window.android.callApi

  详情请参考Demo中的实现：

  ```
  MainActivity
  TPWallet
  ```

