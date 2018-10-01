package js.android.interactive;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;

import com.just.agentweb.AgentWeb;
import com.just.agentweb.ChromeClientCallbackManager;
import com.just.agentweb.DefaultWebClient;

public class MainActivity extends AppCompatActivity implements TPWallet.CallBackListener {
    AgentWeb mAgentWeb;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_common_web_view);
        LinearLayout linearLayout = (LinearLayout) this.findViewById(R.id.linear_web);
        AgentWeb.PreAgentWeb preAgentWeb = AgentWeb.with(this)//
                .setAgentWebParent(linearLayout, new LinearLayout.LayoutParams(-1, -1))//
                .useDefaultIndicator()//
                .defaultProgressBarColor()
                .setReceivedTitleCallback(new ChromeClientCallbackManager.ReceivedTitleCallback() {
                    @Override
                    public void onReceivedTitle(WebView view, String title) {

                    }
                })
                .setWebChromeClient(new WebChromeClient())
                .setWebViewClient(new WebViewClient())
                .setMainFrameErrorView(R.layout.agentweb_error_page, -1)
                .setSecurityType(AgentWeb.SecurityType.strict)
                .setWebLayout(new WebLayout(this))
                .openParallelDownload()//打开并行下载 , 默认串行下载
                .setNotifyIcon(R.mipmap.download) //下载图标
                .setOpenOtherAppWays(DefaultWebClient.OpenOtherAppWays.DISALLOW)//打开其他应用时，弹窗咨询用户是否前往其他应用
                .interceptUnkownScheme() //拦截找不到相关页面的Scheme
                .createAgentWeb()//
                .ready();
        mAgentWeb = preAgentWeb.go("https://h5dex.loopr.io/#/auth/tpwallet");


        mAgentWeb.getJsInterfaceHolder().addJavaObject("android", new TPWallet().setCallBackListener(this));

    }

    @Override
    public void callBack(String string) {
        Log.e("CALL_BACK", "Javascript string = " + string);
        mAgentWeb.getLoader().loadUrl(string);
    }
}
