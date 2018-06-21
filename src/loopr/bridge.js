export default function request(functionName, data, callback) {

  if (callback) {
    const tt = new Date().getTime();
    const t = 'callback_' + tt;
    window[t] = (error, result) => {
      callback(error, result);
      delete window[t]
    };
    window.webkit.messageHandlers.nativeCallbackHandler.postMessage(JSON.stringify({
      functionName,
      data,
      callback: t
    }));
  } else {
    window.webkit.messageHandlers.nativeCallbackHandler.postMessage(JSON.stringify({
      functionName,
      data,
    }));
  }
}
