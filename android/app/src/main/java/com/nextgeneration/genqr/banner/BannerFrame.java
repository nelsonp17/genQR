package com.nextgeneration.genqr.banner;

import android.content.Context;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.nextgeneration.genqr.MainActivity;
import com.nextgeneration.genqr.models.StartSettings;

public class BannerFrame extends FrameLayout {

    public int heigth = 50;
    public int id = View.generateViewId();

    public BannerFrame(){
        super(MainActivity.instance);
        init();
    }
    public BannerFrame(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public BannerFrame(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        setLayoutParams(new LayoutParams(LayoutParams.WRAP_CONTENT, heigth));
        setId(id); // Genera un ID único
        setVisibility(GONE);
        //setGravity(Gravity.CENTER); // Opcional, para centrar el contenido
    }
}
