package com.example.leaflet.services.web;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.example.leaflet.R;

public class WebAppInterface {
    Context mContext;
    WebView mWebView;

    /** Instantiate the interface and set the context */
    public WebAppInterface(Context c) {
        mContext = c;
    }

    public WebAppInterface(Context c, WebView webView) {
        mContext = c;
        mWebView = webView;
    }

    /** Load map View from the web app */
    @JavascriptInterface
    public void loadMapView() {
        String url = mContext.getString(R.string.baseUrl).concat(mContext.getString(R.string.mapPage));
        mWebView.loadUrl(url);
    }
}
