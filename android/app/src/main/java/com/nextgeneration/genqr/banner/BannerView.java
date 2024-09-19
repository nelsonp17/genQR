package com.nextgeneration.genqr.banner;

import static android.view.ViewGroup.LayoutParams.MATCH_PARENT;

import static androidx.core.content.ContextCompat.startActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Pair;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.MutableLiveData;

import com.getcapacitor.CapacitorWebView;
import com.getcapacitor.JSObject;
import com.nextgeneration.genqr.Announcements;
import com.nextgeneration.genqr.BannerActivity;
import com.nextgeneration.genqr.FullscreenActivity;
import com.nextgeneration.genqr.MainActivity;
import com.nextgeneration.genqr.R;
import com.nextgeneration.genqr.interfaces.BannerEventName;
import com.nextgeneration.genqr.models.StartSettings;
import com.startapp.sdk.ads.banner.Banner;
import com.startapp.sdk.ads.banner.BannerFormat;
import com.startapp.sdk.ads.banner.BannerListener;
import com.startapp.sdk.ads.banner.BannerRequest;
import com.startapp.sdk.adsbase.StartAppAd;
import com.startapp.sdk.adsbase.StartAppSDK;
import com.startapp.sdk.adsbase.model.AdPreferences;

public class BannerView {

    //private ViewGroup bannerContainer;
    public String bannerLiveData = null;
    public View bannerView = null;
    public static final String LOG_TAG = BannerView.class.getSimpleName(); // LOG_TAG
    public StartSettings startSettings = null;
    public Context context;
    public CapacitorWebView cWebView;

    public static final String TAG = "BannerView";
    public StartAppAd startAppAd;
    public ViewGroup parentView;
    private Banner startAppBanner = null;
    public static BannerView instance;

    public BannerView(){
        cWebView = new CapacitorWebView(MainActivity.instance, null);
        context = cWebView.getContext();
        //context = MainActivity.instance;
        startSettings = new StartSettings();
        //bannerContainer = new BannerFrame();
        startAppAd = new StartAppAd(context);
        instance = this;

    }

    public void setInitialize(boolean testAdsEnable, String appId, boolean returnAdsEnabled){
        System.err.println(LOG_TAG  + " : " + "AdsActivity setInitialize: test: " + testAdsEnable + " appID: " + appId + " return: " +returnAdsEnabled);
        startSettings.setInitialize(testAdsEnable, appId, returnAdsEnabled);
    }
    public void loadBanner(){
        ViewGroup.LayoutParams layoutParams = new FrameLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT, Gravity.CENTER);
        loadAdView(BannerFormat.BANNER, null, layoutParams);
        //loadBanner2();
    }
    public void showBanner(){
        // Mostrar banner
        showAdView();
        //showBanner2();
    }
    public void hideBanner(){
        // ocultar banner
        hideAdView();
        //hideBanner2();
    }
    @SuppressWarnings("SameParameterValue")
    private void loadAdView(@NonNull BannerFormat format, @Nullable String adTag, @NonNull ViewGroup.LayoutParams layoutParams) {
        AdPreferences adPreferences = new AdPreferences();

        if (adTag != null) {
            adPreferences.setAdTag(adTag);
        }

        new BannerRequest(MainActivity.instance)
                .setAdFormat(format)
                .setAdPreferences(adPreferences)
                .load((creator, error) -> {
                    if (creator != null) {
                        View adView = creator.create(MainActivity.instance, new BannerListener() {
                            @Override
                            public void onReceiveAd(View banner) {
                                System.out.println("loadAdView: onReceiveAd");

                                // Enviamos el evento
                                JSObject AdLoadInfo = new JSObject();
                                AdLoadInfo.put("adId", banner);
                                AdLoadInfo.put("state", "banner");
                                startSettings.notifyListeners(BannerEventName.Loaded, AdLoadInfo);
                            }

                            @Override
                            public void onFailedToReceiveAd(View banner) {
                                System.err.println("loadAdView: onFailedToReceiveAd");

                                // Enviamos el evento
                                JSObject AdError = new JSObject();
                                AdError.put("message", "");
                                AdError.put("code", "");
                                startSettings.notifyListeners(BannerEventName.FailedToReceiveAd, AdError);
                            }

                            @Override
                            public void onImpression(View banner) {
                                System.out.println("loadAdView: onImpression");
                                // Enviamos el evento
                                startSettings.notifyListeners(BannerEventName.Impression, new JSObject());
                            }

                            @Override
                            public void onClick(View banner) {
                                System.out.println("loadAdView: onClick");
                                // Enviamos el evento
                                startSettings.notifyListeners(BannerEventName.Click, new JSObject());
                            }
                        });

                        adView.setLayoutParams(layoutParams);

                        bannerView = adView;
                        bannerLiveData = "IDLE";
                    } else {
                        System.err.println("loadAdView: error: " + error);

                        bannerLiveData = null;
                    }
                });

        bannerLiveData = "LOADING";
    }

    private void showAdView() {
        if (bannerLiveData != null) {
            //bannerContainer.removeAllViews();
            ///bannerContainer.addView(bannerView);
            bannerLiveData = "VISIBLE";

            startSettings.notifyListeners(BannerEventName.Show, new JSObject());

            //BannerActivity bannerActivity = new BannerActivity();
            //Intent intent = new Intent(MainActivity.instance, BannerActivity.class);
            MainActivity.openActivity(MainActivity.instance, BannerActivity.class);
            //Intent intent = new Intent(Intent.ACTION_PICK, null, MainActivity.instance, BannerActivity.class);
            //intent.setAction(Intent.ACTION_VIEW);
            //Announcements.announcements.setBannerView(Announcements.announcements._call, intent);
            //startActivity(MainActivity.instance, intent, null);

            // Esto abrirá la página de una aplicación específica en la tienda Google Play.
            // startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse("market://details?id=com.mycompany.mypackage")));

            // Intent intent = new Intent(Intent.ACTION_VIEW);
            //intent.setDataAndType(uri, "video/mp4");


        } else {
            Toast.makeText(MainActivity.instance, "AdView is not ready", Toast.LENGTH_SHORT).show();
        }
    }

    private void hideAdView() {
        //bannerContainer.removeAllViews();
        bannerLiveData = "IDLE";
        bannerView = null;
    }


    public void loadBanner2() {
        startAppBanner = new Banner(context, new BannerListener() {
            @Override
            public void onReceiveAd(View view) {
                System.out.println("loadAdView: onReceiveAd");

                // Enviamos el evento
                JSObject AdLoadInfo = new JSObject();
                AdLoadInfo.put("adId", "");
                AdLoadInfo.put("state", "banner");
                startSettings.notifyListeners(BannerEventName.Loaded, AdLoadInfo);
            }

            @Override
            public void onFailedToReceiveAd(View view) {
                System.err.println("loadAdView: onFailedToReceiveAd");

                // Enviamos el evento
                JSObject AdError = new JSObject();
                AdError.put("message", "");
                AdError.put("code", "");
                startSettings.notifyListeners(BannerEventName.FailedToReceiveAd, AdError);
            }

            @Override
            public void onImpression(View view) {
                System.out.println("loadAdView: onImpression");
                // Enviamos el evento
                startSettings.notifyListeners(BannerEventName.Impression, new JSObject());
            }

            @Override
            public void onClick(View view) {
                System.out.println("loadAdView: onClick");
                // Enviamos el evento
                startSettings.notifyListeners(BannerEventName.Click, new JSObject());
            }
        });

        // Forcing specific banner dimensions to prevent other formats from loading
        startAppBanner.loadAd(320, 50); // Standard Banner
    }

    public void showBanner2() {
        if (startAppBanner == null) {
            Toast.makeText(context, "The banner you tried to load is not yet loaded", Toast.LENGTH_SHORT).show();
            return;
        }

        startAppBanner.showBanner();

        //View view = cWebView.getRootView();
        /**
        View view = new View(context);
        //cWebView.setBridge(Announcements.announcements.getBridge());


        view.setLayoutParams(
                new LinearLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        1.0F
                )
        );
        RelativeLayout mainLayout = new RelativeLayout(view.getContext());

        // Define StartApp Banner
        //Banner startAppBanner = new Banner(context);
        // startAppBanner
        RelativeLayout.LayoutParams bannerParameters =
                new RelativeLayout.LayoutParams(
                        RelativeLayout.LayoutParams.WRAP_CONTENT,
                        RelativeLayout.LayoutParams.WRAP_CONTENT);

        bannerParameters.addRule(RelativeLayout.CENTER_HORIZONTAL);
        bannerParameters.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        mainLayout.addView(startAppBanner, bannerParameters);**/

        //view.add
        //cWebView.addView(mainLayout);

        //Announcements.announcements.getBridge().registerForActivityResult(mainLayout, "");

        // Add to main Layout

        //cWebView.loadUrl("javascript:document.BANNER='" + mainLayout + "'; ");


        //Announcements.Bridge.findViewById();

        //View view = getBridge().getWebView().getView();
        /**ViewGroup wvParentView = (ViewGroup) view.getRootView();

        if (parentView == null) {
            parentView = new LinearLayout(context);
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
        parentView.requestFocus();**/
    }

    public void hideBanner2() {
        if (startAppBanner != null) {
            startAppBanner.hideBanner();
            startAppBanner.setVisibility(View.GONE);
            parentView = null;
            startAppBanner = null;

        }

    }

}
