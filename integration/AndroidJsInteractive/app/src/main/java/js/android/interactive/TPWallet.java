package js.android.interactive;

import android.text.TextUtils;
import android.util.Log;
import android.webkit.JavascriptInterface;

import org.json.JSONException;
import org.json.JSONObject;

public class TPWallet extends Object {
    private static final String KEY_METHOD = "method";
    private static final String KEY_DATA = "data";
    private static final String KEY_CALLBACK = "callback";
    private static final String FUNCTION_GET_ACCOUNT = "user.getCurrentAccount";
    private static final String FUNCTION_GET_LANGUAGE = "device.getCurrentLanguage";
    private static final String FUNCTION_GWT_CURRENCY = "device.getCurrentCurrency";
    private static final String FUNCTION_MWSSAGE_SIGN = "message.sign";
    private static final String FUCTION_TRANSACTION_SIGN = "transaction.sign";

    @JavascriptInterface
    public void callApi(String content) {
        Log.d("agentweb", "content:" + content);
        try {
            JSONObject jsonObject = new JSONObject(content);
            String method = jsonObject.getString(KEY_METHOD);
            String callback = jsonObject.getString(KEY_CALLBACK);
            String cmd = new String();
            JSONObject object = new JSONObject();
            if (TextUtils.isEmpty(method)) return;
            if (method.equals(FUNCTION_GET_ACCOUNT)) {
                String address = "0x20b48799120bac53867e007c34e92531e398ffb9";
                object.put("result", address);
                cmd = "javascript:" + callback + "(" + object.toString() + ")";
            } else if (method.equals(FUNCTION_GET_LANGUAGE)) {
                String language = "zh-CN";
                object.put("result", language);
                cmd = "javascript:" + callback + "(" + object.toString() + ")";
            } else if (method.equals(FUNCTION_GWT_CURRENCY)) {
                String currentUnit = "CNY";
                object.put("result", currentUnit);
                cmd = "javascript:" + callback + "(" + object.toString() + ")";
            } else if (method.equals(FUNCTION_MWSSAGE_SIGN)) {
                JSONObject data = jsonObject.getJSONObject(KEY_DATA);
                String message = data.getString("message");
                //签名后的数据
                String signature = "0xd62bc0adee114ba8cb42f41f7e685736a7847ec0d93fd7edbb682070d8e88ee03c253b551a8029f05e720bf9f541f532ddf4b2cb446338b68cd7581380055f881b";
                object.put("result", signature);
                cmd = "javascript:" + callback + "(" + object.toString() + ")";
            } else if (FUCTION_TRANSACTION_SIGN.equals(method)) {
                cmd = "javascript:" + callback + "(" + object.toString() + ")";
            }
            Log.e("agentweb", method + " cmd:" + cmd);
            if (callBackListener != null) {
                callBackListener.callBack(cmd);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public CallBackListener callBackListener;

    public TPWallet setCallBackListener(CallBackListener callBackListener) {
        this.callBackListener = callBackListener;
        return this;
    }

    public interface CallBackListener {
        void callBack(String string);
    }

}
