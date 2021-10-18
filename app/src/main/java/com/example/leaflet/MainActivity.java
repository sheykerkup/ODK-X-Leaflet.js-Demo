package com.example.leaflet;

import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;

import android.os.Bundle;
import android.webkit.WebView;

import com.example.leaflet.services.web.LocalContentWebViewClient;
import com.example.leaflet.services.web.MyWebClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView myWebView = (WebView) findViewById(R.id.webview);
//        myWebView.loadUrl("https://www.outreachy.org/");
//        myWebView.setWebViewClient(new MyWebClient());

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .addPathHandler("/res/", new WebViewAssetLoader.ResourcesPathHandler(this))
                .build();

        myWebView.setWebViewClient(new LocalContentWebViewClient(assetLoader));

        myWebView.loadUrl("https://10.12.1.172:8000/assets/index.html");
//        myWebView.loadUrl("file:///android_asset/index.html");
    }
}