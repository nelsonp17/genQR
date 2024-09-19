package com.nextgeneration.genqr;


import static androidx.core.content.ContextCompat.startActivity;

import android.content.Intent;
import android.view.View;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.CapacitorWebView;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.nextgeneration.genqr.banner.BannerView;
import com.startapp.sdk.adsbase.StartAppAd;

@CapacitorPlugin(name= "Announcements")
public class Announcements extends Plugin {
    //private CapacitorStartIO implementation;

    private String APPLICATION_ID = "";
    private boolean isDev = true;
    private boolean returnAdsEnabled = true;
    private Ads ads = null;
    private MainActivity main = MainActivity.instance;
    public static Announcements announcements;
    public BannerView bannerView;
    private CapacitorWebView cWebView;
    public static View Bridge;
    public PluginCall _call;

    @Override
    public void load() {
        super.load();
        announcements = this;
        ads = new Ads();
        bannerView = new BannerView();


        cWebView = new CapacitorWebView(MainActivity.instance, null);
        Bridge = getBridge().getWebView().getRootView();
    }

    public void open(){
        MainActivity.openActivity(MainActivity.instance);
        System.out.println("Abriendo...");


    }

    @PluginMethod()
    public void intersticial(PluginCall call){
        open();
        String value = call.getString("value");
        call.resolve(new JSObject().put("value", value));
    }

    // Initialize AdMob with appId
    @PluginMethod()
    public void initialize(PluginCall call) {
        if(announcements == null){
            announcements = this;
            ads = new Ads();
            bannerView = new BannerView();
        }
        System.out.println("initialize");
        this.setRequestConfiguration(call);
        try {
            call.resolve();
        } catch (Exception ex) {
            System.err.println("error");
            call.reject(ex.getLocalizedMessage(), ex);
        }
    }

    @PluginMethod()
    public void loadInterstitial(PluginCall call) {
        System.out.println("loadInterstitial");
        _call = call;
        try {
            boolean autoShow = call.getBoolean("autoShow", false);
            String adModeString = call.getString("adMode", "AUTOMATIC"); // AUTOMATIC, FULLPAGE, VIDEO, REWARDED_VIDEO, OFFERWALL, OVERLAY

            StartAppAd.AdMode adMode;
            switch (adModeString){
                case "AUTOMATIC":
                    adMode = StartAppAd.AdMode.AUTOMATIC;
                    break;
                case "FULLPAGE":
                    adMode = StartAppAd.AdMode.FULLPAGE;
                    break;
                case "VIDEO":
                    adMode = StartAppAd.AdMode.VIDEO;
                    break;
                case "REWARDED_VIDEO":
                    adMode = StartAppAd.AdMode.REWARDED_VIDEO;
                    break;
                case "OFFERWALL":
                    adMode = StartAppAd.AdMode.OFFERWALL;
                    break;
                case "OVERLAY":
                    adMode = StartAppAd.AdMode.OVERLAY;
                    break;
                default:
                    adMode = StartAppAd.AdMode.AUTOMATIC;
                    break;
            }

            ads.loadInterstitial(adMode, autoShow);
            call.resolve();
        } catch (Exception ex) {
            System.err.println("error");
            call.reject(ex.getLocalizedMessage(), ex);
        }

    }

    @PluginMethod()
    public void showInterstitial(PluginCall call) {
        System.out.println("showInterstitial");
        try {
            ads.showInterstitial();
            call.resolve();
        } catch (Exception ex) {
            System.err.println("error");
            call.reject(ex.getLocalizedMessage(), ex);
        }
    }

    @PluginMethod()
    public void timeFrequency(PluginCall call) {
        int second = call.getInt("second", 0);
        if(second <= 0){
            call.reject("El valor second debe ser mayor a cero");
            return;
        }
        ads.timeFrequency(second);
        call.resolve(new JSObject().put("result", true));
    }




    // User Consent
    @PluginMethod
    public void requestConsentInfo(final PluginCall call) {
        //adConsentExecutor.requestConsentInfo(call, this::notifyListeners);
    }

    @PluginMethod
    public void showConsentForm(final PluginCall call) {
        //adConsentExecutor.showConsentForm(call, this::notifyListeners);
    }

    @PluginMethod
    public void resetConsentInfo(final PluginCall call) {
        //adConsentExecutor.resetConsentInfo(call, this::notifyListeners);
    }


    public void setRequestConfiguration(PluginCall call) {
        // Recuperamos las variables
        this.returnAdsEnabled = call.getBoolean("returnAdsEnabled");
        this.isDev = call.getBoolean("isDev");
        this.APPLICATION_ID = call.getString("appId");

        ads.setInitialize(isDev, APPLICATION_ID, returnAdsEnabled);
        bannerView.setInitialize(isDev, APPLICATION_ID, returnAdsEnabled);
    }

    public void emitEvent(String eventName, JSObject data){
        notifyListeners(eventName, data);
    }



}
