package com.sipin.salescloudandroid.screen.present;

import android.content.Context;
import android.os.Bundle;
import android.view.Display;
import android.app.Presentation;
import android.view.View;
import com.sipin.salescloudandroid.R;
import android.widget.TextView;

import com.sipin.salescloudandroid.screen.BasePresentation;

public class TextDisplay extends BasePresentation {
    
    private TextView tv;

    public TextDisplay(Context outerContext, Display display) {
        super(outerContext, display);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.vice_text_layout);
        tv = (TextView) findViewById(R.id.tv);
    }

    public void update(String text) {
        tv.setText(text);
    }
}