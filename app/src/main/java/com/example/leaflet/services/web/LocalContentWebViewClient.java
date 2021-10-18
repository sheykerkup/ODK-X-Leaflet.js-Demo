package com.example.leaflet.services.web;

import android.net.Uri;
import android.net.http.SslError;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import java.net.URI;

public class LocalContentWebViewClient extends WebViewClientCompat{
    private  final WebViewAssetLoader mAssetLoader;

    public LocalContentWebViewClient(WebViewAssetLoader mAssetLoader) {
        this.mAssetLoader = mAssetLoader;
    }

    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
        handler.proceed(); //ignore in development
    }

    @Nullable
    @Override
    @RequiresApi(21)
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        return mAssetLoader.shouldInterceptRequest(request.getUrl());
    }

    @Nullable
    @Override
    @SuppressWarnings("deprecation") // to support API < 21
    public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
        return mAssetLoader.shouldInterceptRequest(Uri.parse(url));
    }
}
