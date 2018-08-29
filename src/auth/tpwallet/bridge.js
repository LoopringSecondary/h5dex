import { id } from 'LoopringJS/common/request'

function ios_request (method, data, callback) {
  if (callback) {
    const tt = new Date().getTime()
    let t = 'callback_' + tt + '_' + id()
    window[t] = ({error, result}) => {
      callback({error, result})
      delete window[t]
    }
    window.webkit.messageHandlers.callApi.postMessage(JSON.stringify({
      method,
      data,
      callback: t
    }))
  } else {
    window.webkit.messageHandlers.callApi.postMessage(JSON.stringify({
      method,
      data,
    }))
  }
}

function isIosReady () {
  return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.callApi
}

function and_request (method, data, callback) {
  if (callback) {
    const tt = new Date().getTime()
    let t = 'callback_' + tt + '_' + id()
    window[t] = ({error, result}) => {
      callback({error, result})
      delete window[t]
    }
    window.android.callApi(JSON.stringify({
      method,
      data,
      callback: t
    }))
  } else {
    window.android.callApi(JSON.stringify({
      method,
      data,
    }))
  }
}

function isAndReady () {
  return window.android && window.android.callApi
}

export function isTPWalletReady () {
  const userAgentInfo = navigator.userAgent
  const isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Adr') > -1 //android终端
  const isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isiOS) {
    return isIosReady()
  } else if (isAndroid) {
    return isAndReady()
  }
  return false
}

export function callApi (method, data, callback) {
  const userAgentInfo = navigator.userAgent
  const isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Adr') > -1 //android终端
  const isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isiOS) {
    ios_request(method, data, callback)
  } else if (isAndroid) {
    and_request(method, data, callback)
  } else {
    window[callback]({error: {message: 'not such platform'}})
  }
}
