package com.nextgeneration.genqr;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.nextgeneration.genqr.banner.BannerView;
import com.startapp.sdk.adsbase.StartAppSDK;

public class BannerActivity extends AppCompatActivity {
    private ViewGroup bannerContainer;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        //setTheme(android.R.style.Theme_Dialog); // Establece el tema de diálogo
        //setTheme(android.R.style.Theme_DeviceDefault_Dialog_NoActionBar);
        setContentView(R.layout.activity_banner);
        //setTitle("Start.io SDK " + StartAppSDK.getVersion());

        bannerContainer = findViewById(R.id.banner_annon);

        //bannerContainer.removeAllViews();
        //bannerContainer.addView(bannerView);
        start();
    }

    public void start(){
        View pair = BannerView.instance.bannerView;
        String state = BannerView.instance.bannerLiveData;
        if (state != null && bannerContainer != null) {
            bannerContainer.removeAllViews();
            bannerContainer.addView(pair);
        } else {
            Toast.makeText(this, "AdView is not ready", Toast.LENGTH_SHORT).show();
        }
    }
}
