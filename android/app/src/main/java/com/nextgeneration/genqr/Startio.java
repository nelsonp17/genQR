package com.nextgeneration.genqr;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import android.content.Context;

import com.startapp.sdk.adsbase.StartAppSDK;

@CapacitorPlugin(name = "Startio")
public class Startio extends Plugin{

    public Context context = null;
    //public StartAppAd interstitialAd = new StartAppAd(getContext());
    //private CapacitorStartIO implementation;


    private String APPLICATION_ID = "";
    private boolean isDev = true;
    private boolean returnAdsEnabled = true;

    /**private AdInterstitialExecutor adInterstitialExecutor = new AdInterstitialExecutor(
            getContext(),
            getActivity(),
            this::getContext,
            this::getActivity,
            this::notifyListeners,
            getLogTag()
    );**/

    // Initialize AdMob with appId
    @PluginMethod()
    public void initialize(PluginCall call) {
        this.setRequestConfiguration(call);
        try {
            context = getContext();
            call.resolve();
        } catch (Exception ex) {
            call.reject(ex.getLocalizedMessage(), ex);
        }
    }

    @PluginMethod()
    public void loadInterstitial(PluginCall call) {
        //JSObject result = new JSObject();
        //call.resolve(result);
        //Intent intent = new Intent(getContext(), Bridge.class);
        //getContext().startActivity(intent);

        // Start the Activity for result using the name of the callback method
        //startActivityForResult(call, intent, "pickImageResult");
        //adInterstitialExecutor.load(call);


    }

    // Show interstitial Ad
    @PluginMethod()
    public void showInterstitial(PluginCall call) {
        //adInterstitialExecutor.show(call);
    }

    /**@PluginMethod()
    public void prepareRewardVideoAd(final PluginCall call) {
    //adRewardExecutor.prepareRewardVideoAd(call);
    }

     @PluginMethod()
     public void showRewardVideoAd(final PluginCall call) {
     //adRewardExecutor.showRewardVideoAd(call);
     }**/


    public void setRequestConfiguration(final PluginCall call) {
        // Recuperamos las variables
        boolean returnAdsEnabled = call.getBoolean("returnAdsEnabled");
        boolean isDev = call.getBoolean("isDev");
        String appId = call.getString("appId");

        // Seteamos las variables
        this.APPLICATION_ID = appId;
        this.isDev = isDev;
        this.returnAdsEnabled = returnAdsEnabled;

        // TODO make sure to remove this line in production
        StartAppSDK.setTestAdsEnabled(this.isDev);

        // TODO make sure to use your own App ID from the https://portal.start.io
        // NOTE for the testing purposes you can use demo App ID: 205489527
        StartAppSDK.initParams(context, APPLICATION_ID)
                .setReturnAdsEnabled(this.returnAdsEnabled)
                //.setCallback(() -> initialized.setValue(true))
                //.setTestAdsEnabled(isDev)
                .init();
    }
}
