package com.nextgeneration.genqr;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.startapp.sdk.adsbase.StartAppSDK;

import java.util.Arrays;

public class MainActivity extends BridgeActivity {
    public static MainActivity instance = null;

    @Override
    public void onCreate(Bundle savedInstanceState){

        MainActivity.instance = this;
        registerPlugins(Arrays.asList(
                Startio.class,
                Announcements.class
        ));

        super.onCreate(savedInstanceState);
    }

    public static void openActivity (MainActivity activity){
        Intent nextActivity = new Intent(activity, FullscreenActivity.class);
        activity.startActivity(nextActivity);
    }

    public static void openActivity (MainActivity activity, Class<?> className){
        Intent intent = new Intent(activity, className);
        intent.setAction(Intent.ACTION_VIEW);
        activity.startActivity(intent);
    }

}
