package com.example.leaflet;

import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.example.leaflet.services.web.LocalContentWebViewClient;
import com.example.leaflet.services.web.WebAppInterface;

public class MainActivity extends AppCompatActivity {
    WebView mWebView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mWebView = findViewById(R.id.webview);

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler(getString(R.string.assetsDir), new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler(getString(R.string.resDir), new WebViewAssetLoader.ResourcesPathHandler(this))
                .build();

        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        mWebView.setWebViewClient(new LocalContentWebViewClient(assetLoader, this));
        mWebView.addJavascriptInterface(new WebAppInterface(this, mWebView), getString(R.string.leafletInterface));

        String url = getString(R.string.baseUrl).concat(getString(R.string.mapPage));
        mWebView.loadUrl(url);
    }

    @Override
    public void onBackPressed() {
        if (mWebView.canGoBack()){
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}