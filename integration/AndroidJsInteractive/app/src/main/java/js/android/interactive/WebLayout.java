package js.android.interactive;

import android.app.Activity;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.webkit.WebView;

import com.just.agentweb.IWebLayout;

/**
 * Created by cenxiaozhong on 2017/7/1.
 * source code  https://github.com/Justson/AgentWeb
 */

public class WebLayout implements IWebLayout {

    private Activity mActivity;
    private WebView mWebView = null;

    public WebLayout(Activity activity) {
        this.mActivity = activity;
        mWebView = (WebView) LayoutInflater.from(activity).inflate(R.layout.fragment_twk_web, null);
    }

    @NonNull
    @Override
    public ViewGroup getLayout() {
        return mWebView;
    }

    @Nullable
    @Override
    public WebView getWeb() {
        return mWebView;
    }




}
