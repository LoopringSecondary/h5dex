import {id} from 'LoopringJS/common/request'
export default function request (method, data, callback) {

  if (callback) {
    const tt = new Date().getTime()
    let t = 'callback_' + tt + '_' + id()
      window[t] = ({error, result}) => {
        callback({error, result})
        delete window[t]
      }
    window.webkit.messageHandlers.nativeCallbackHandler.postMessage(JSON.stringify({
      method,
      data,
      callback: t
    }))
  } else {
    window.webkit.messageHandlers.nativeCallbackHandler.postMessage(JSON.stringify({
      method,
      data,
    }))
  }
}
