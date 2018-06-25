export default function request(method, data, callback) {

  if (callback) {
    const tt = new Date().getTime();
    const t = 'callback_' + tt;
    window[t] = (error, result) => {
      callback(error, result);
      delete window[t]
    };
    window.webkit.messageHandlers.nativeCallbackHandler.postMessage(JSON.stringify({
      method,
      data,
      callback: t
    }));
  } else {
    window.webkit.messageHandlers.nativeCallbackHandler.postMessage(JSON.stringify({
      method,
      data,
    }));
  }
}
