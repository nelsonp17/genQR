package com.nextgeneration.genqr;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.getcapacitor.JSObject;
import com.nextgeneration.genqr.interfaces.InterstitialEventName;
import com.nextgeneration.genqr.models.StartSettings;
import com.startapp.sdk.adsbase.Ad;
import com.startapp.sdk.adsbase.AutoInterstitialPreferences;
import com.startapp.sdk.adsbase.StartAppAd;
import com.startapp.sdk.adsbase.adlisteners.AdDisplayListener;
import com.startapp.sdk.adsbase.adlisteners.AdEventListener;
import com.startapp.sdk.adsbase.adlisteners.VideoListener;

public class Ads {

    private static boolean initialize; // cuando se settea el StartAppSDK
    private static boolean created; // cuando se crea el bundle
    public static Ads instance; // instancia de clase
    private static final String LOG_TAG = Ads.class.getSimpleName(); // LOG_TAG

    private StartAppAd interstitialLiveData = null;
    private StartSettings startSettings = null;
    private StartAppAd rewardedLiveData = null;
    private StartAppAd.AdMode IS_REWARDED_VIDEO = null;

    // Start Ads
    public StartAppAd interstitialAd = null;
    public StartAppAd rewardedAd = null;

    public Ads() {
        Ads.instance = this;
        Ads.initialize = false;
        Ads.created = true;

        System.out.println(LOG_TAG  + " : " + "AdsActivity onCreate...");

        // setters
        interstitialLiveData = null;
        startSettings = new StartSettings();

    }

    public void setInitialize(boolean testAdsEnable, String appId, boolean returnAdsEnabled){
        System.err.println(LOG_TAG  + " : " + "AdsActivity setInitialize: test: " + testAdsEnable + " appID: " + appId + " return: " +returnAdsEnabled);
        startSettings.setInitialize(testAdsEnable, appId, returnAdsEnabled);

        // setting ads
        this.interstitialAd = new StartAppAd(MainActivity.instance);
    }

    public void loadInterstitial(StartAppAd.AdMode adMode, boolean autoShow) {
        System.out.println(LOG_TAG  + " : " + "AdsActivity loadInterstitial");

        interstitialLiveData = null;
        IS_REWARDED_VIDEO = adMode;
        interstitialAd.loadAd(adMode, new AdEventListener() {
            @Override
            public void onReceiveAd(@NonNull Ad ad) {
                System.out.println(LOG_TAG + " loadInterstitial: onReceiveAd");
                interstitialLiveData = interstitialAd;

                // Enviamos el evento de error
                Ad.AdState state = interstitialLiveData.getState();
                System.out.println("state: " + state);
                JSObject AdLoadInfo = new JSObject();
                AdLoadInfo.put("adId", interstitialLiveData.getAdId());
                AdLoadInfo.put("state", state);

                startSettings.notifyListeners(InterstitialEventName.Loaded, AdLoadInfo);
                if(autoShow == true){ showInterstitial(); }

            }

            @Override
            public void onFailedToReceiveAd(@Nullable Ad ad) {
                System.err.println(LOG_TAG + " loadInterstitial: onFailedToReceiveAd: " + (ad != null ? ad.getErrorMessage() : null));
                interstitialLiveData = interstitialAd;

                // Enviamos el evento de error
                JSObject AdError = new JSObject();
                System.out.println("message: " + interstitialAd.getErrorMessage());
                AdError.put("message", interstitialAd.getErrorMessage());
                AdError.put("code", interstitialAd.hashCode());
                startSettings.notifyListeners(InterstitialEventName.FailedToReceiveAd, AdError);
            }
        });


    }

    public void showInterstitial() {
        System.out.println(LOG_TAG  + " : " + "AdsActivity showInterstitial");

        StartAppAd pair = interstitialLiveData;
        if (pair != null) {
            interstitialLiveData = null;

            pair.showAd(new AdDisplayListener() {
                @Override
                public void adHidden(Ad ad) {
                    System.out.println(LOG_TAG + " showInterstitial: adHidden");

                    // Enviamos el evento de error
                    startSettings.notifyListeners(InterstitialEventName.Hidden, new JSObject());
                }

                @Override
                public void adDisplayed(Ad ad) {
                    System.out.println(LOG_TAG + " showInterstitial: adDisplayed");
                    // Enviamos el evento de error
                    startSettings.notifyListeners(InterstitialEventName.Displayed, new JSObject());
                }

                @Override
                public void adClicked(Ad ad) {
                    System.out.println(LOG_TAG +" showInterstitial: adClicked");

                    // Enviamos el evento de error
                    startSettings.notifyListeners(InterstitialEventName.Clicked, new JSObject());
                }

                @Override
                public void adNotDisplayed(Ad ad) {
                    System.out.println(LOG_TAG +" showInterstitial: adNotDisplayed");

                    // Enviamos el evento de error
                    startSettings.notifyListeners(InterstitialEventName.NotDisplayed, new JSObject());
                }
            });

            if(IS_REWARDED_VIDEO.equals(StartAppAd.AdMode.REWARDED_VIDEO)){
                pair.setVideoListener(new VideoListener() {
                    @Override
                    public void onVideoCompleted() {
                        startSettings.notifyListeners(InterstitialEventName.RewardedVideoCompleted, new JSObject());
                    }
                });
            }
        } else {
            Toast.makeText(MainActivity.instance, "Interstitial is not ready", Toast.LENGTH_SHORT).show();
        }
    }

    public void timeFrequency(int second){
        startSettings.timeFrequency(second);
    }


}
