package com.startapp.cordova.ad;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.util.Log;
import android.app.Activity;
import android.view.View;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.startapp.sdk.adsbase.Ad;
import com.startapp.sdk.adsbase.StartAppAd;
import com.startapp.sdk.adsbase.StartAppSDK;
import com.startapp.sdk.adsbase.VideoListener;
import com.startapp.sdk.adsbase.adlisteners.AdEventListener;
import com.startapp.sdk.adsbase.adlisteners.AdDisplayListener;

import com.startapp.sdk.ads.banner.Banner;
import com.startapp.sdk.ads.banner.BannerListener;

public class StartAppAdsPlugin extends CordovaPlugin {

  private CallbackContext PUBLIC_CALLBACKS = null;
  private static final String TAG = "StartAppAdsPlugin";
  private StartAppAd startAppAd;
  private CordovaWebView cWebView;
  private ViewGroup parentView;
  private Banner startAppBanner = null;
  private StartAppAd rewardedVideo = null;

  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
    cWebView = webView;
  }

  public void loadBanner(CallbackContext callbackContext){
    startAppBanner = new Banner(cordova.getActivity(), new BannerListener() {
      @Override
      public void onReceiveAd(View banner) {
        Log.d(TAG, "Banner has been loaded!");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startappads.banner.load');");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startio.banner.load');");
      }

      @Override
      public void onFailedToReceiveAd(View banner) {
        Log.d(TAG, "Banner load failed!");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startappads.banner.load_fail');");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startio.banner.load_fail');");
      }

      @Override
      public void onClick(View banner) {
        Log.d(TAG, "Banner clicked!");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startappads.banner.clicked');");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startio.banner.clicked');");
      }

      @Override
      public void onImpression(View banner) {
        Log.d(TAG, "Banner impression!");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startappads.banner.impression');");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startio.banner.impression');");
      }
    });
    cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startappads.banner.load.req');");
    cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startio.banner.load.req');");

    // Forcing specefic banner dimensions to prevent other formats from loading
    startAppBanner.loadAd(320, 50); // Standard Banner
  }

  public void showBanner(CallbackContext callbackContext) {
    if(startAppBanner == null){
      cWebView.loadUrl("javascript:console.warn('The banner you tried to load is not yet loaded');");
      return;
    }

    View view = cWebView.getView();
    ViewGroup wvParentView = (ViewGroup) view.getParent();

    if (parentView == null) {
        parentView = new LinearLayout(cWebView.getContext());
    }

    if (wvParentView != null && wvParentView != parentView) {
        wvParentView.removeView(view);
        LinearLayout content = (LinearLayout) parentView;
        content.setOrientation(LinearLayout.VERTICAL);
        parentView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 0.0F));
        view.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 1.0F));
        parentView.addView(view);
        wvParentView.addView(parentView);
        parentView.addView(startAppBanner);
    }

    //parentView.bringToFront();
    parentView.requestLayout();
    parentView.requestFocus();
  }

  public void hideBanner(CallbackContext callbackContext) {
    if (startAppBanner != null) {
        startAppBanner.hideBanner();
        startAppBanner.setVisibility(View.GONE);
        parentView = null;
        startAppBanner = null;
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startappads.banner.hide');");
        cWebView.loadUrl("javascript:cordova.fireDocumentEvent('startio.banner.hide');");
    }
  }

}

package com.example.startappads;

import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import com.startapp.sdk.ads.banner.Banner;
import com.startapp.sdk.ads.banner.BannerListener;
import com.startapp.sdk.adsbase.StartAppAd;

public class StartAppAdsPlugin extends Plugin {

    private static final String TAG = "StartAppAdsPlugin";
    private StartAppAd startAppAd;
    private ViewGroup parentView;
    private Banner startAppBanner = null;

    @Override
    public void load() {
        super.load();
        startAppAd = new StartAppAd(getContext());
    }

    @PluginMethod
    public void loadBanner(PluginCall call) {
        startAppBanner = new Banner(getContext(), new BannerListener() {
            @Override
            public void onReceiveAd(View banner) {
                Log.d(TAG, "Banner has been loaded!");
                notifyListeners("startappads.banner.load", new JSObject());
                notifyListeners("startio.banner.load", new JSObject());
            }

            // Rest of the BannerListener methods (onFailedToReceiveAd, onClick, onImpression)...

        });

        // Forcing specific banner dimensions to prevent other formats from loading
        startAppBanner.loadAd(320, 50); // Standard Banner

        call.success();
    }

    @PluginMethod
    public void showBanner(PluginCall call) {
        if (startAppBanner == null) {
            call.error("The banner you tried to load is not yet loaded");
            return;
        }

        View view = getBridge().getWebView().getView();
        ViewGroup wvParentView = (ViewGroup) view.getParent();

        if (parentView == null) {
            parentView = new LinearLayout(getContext());
        }

        if (wvParentView != null && wvParentView != parentView) {
            wvParentView.removeView(view);
            LinearLayout content = (LinearLayout) parentView;
            content.setOrientation(LinearLayout.VERTICAL);
            parentView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 0.0F));
            view.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, 1.0F));
            parentView.addView(view);
            wvParentView.addView(parentView);
            parentView.addView(startAppBanner);
        }

        parentView.requestLayout();
        parentView.requestFocus();

        call.success();
    }

    @PluginMethod
    public void hideBanner(PluginCall call) {
        if (startAppBanner != null) {
            startAppBanner.hideBanner();
            startAppBanner.setVisibility(View.GONE);
            parentView = null;
            startAppBanner = null;
            notifyListeners("startappads.banner.hide", new JSObject());
            notifyListeners("startio.banner.hide", new JSObject());
        }

        call.success();
    }
}
