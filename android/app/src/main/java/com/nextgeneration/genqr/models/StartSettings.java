package com.nextgeneration.genqr.models;

import com.getcapacitor.JSObject;
import com.nextgeneration.genqr.Announcements;
import com.nextgeneration.genqr.MainActivity;
import com.startapp.sdk.adsbase.AutoInterstitialPreferences;
import com.startapp.sdk.adsbase.StartAppAd;
import com.startapp.sdk.adsbase.StartAppSDK;

public class StartSettings {
    private static final String LOG_TAG = StartSettings.class.getSimpleName(); // LOG_TAG

    public void setInitialize(boolean testAdsEnable, String appId, boolean returnAdsEnabled){
        System.err.println(LOG_TAG  + " : " + "AdsActivity setInitialize: test: " + testAdsEnable + " appID: " + appId + " return: " +returnAdsEnabled);
        MainActivity mainActivity = MainActivity.instance;

        // TODO make sure to remove this line in production
        StartAppSDK.setTestAdsEnabled(testAdsEnable);

        // TODO make sure to use your own App ID from the https://portal.start.io
        // NOTE for the testing purposes you can use demo App ID: 205489527
        StartAppSDK.initParams(mainActivity, appId)
                .setReturnAdsEnabled(returnAdsEnabled)
                .init();
    }

    public void notifyListeners(String eventName, JSObject data) {
        System.out.println("Emitiendo un evento: " + eventName);
        Announcements.announcements.emitEvent(eventName, data);
        System.out.println("Emitido un evento: " + eventName);
        System.out.println("Emitido un evento (data): " + data);
    }

    // Time Frequency
    public void timeFrequency(int second){
        StartAppAd.setAutoInterstitialPreferences(
                new AutoInterstitialPreferences()
                        .setSecondsBetweenAds(second)
        );
    }
}
