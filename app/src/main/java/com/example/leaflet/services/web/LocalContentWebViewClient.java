package com.example.leaflet.services.web;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.net.http.SslError;
import android.webkit.SslErrorHandler;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.webkit.WebViewAssetLoader;
import androidx.webkit.WebViewClientCompat;

import com.example.leaflet.R;

import java.net.URI;

public class LocalContentWebViewClient extends WebViewClientCompat{
    private  final WebViewAssetLoader mAssetLoader;
    private  final Context mcontext;

    public LocalContentWebViewClient(WebViewAssetLoader mAssetLoader, Context context) {
        this.mAssetLoader = mAssetLoader;
        this.mcontext     = context;
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

    @Override
    public boolean shouldOverrideUrlLoading(@NonNull WebView view, @NonNull WebResourceRequest request) {
        if (mcontext.getString(R.string.baseUrl).contains(request.getUrl().getHost())) {
            // This is my website, so do not override; let my WebView load the page
            return false;
        }
        // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
        Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
        mcontext.startActivity(intent);
        return true;

    }
}
