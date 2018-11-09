package com.sipin.salescloudandroid.screen;

import android.content.Context;
import android.hardware.display.DisplayManager;
import android.view.Display;

import com.sipin.salescloudandroid.screen.present.TextDisplay;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ScreenModule extends ReactContextBaseJavaModule {

  private Display[] displays = null;//屏幕数组
  public TextDisplay textDisplay = null;

  public ScreenModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "SunmiT2Screen";
  }

   @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    return constants;
  }

  public Display[] getDisplays() {
    DisplayManager mDisplayManager = (DisplayManager) getReactApplicationContext().getSystemService(Context.DISPLAY_SERVICE);
    return mDisplayManager.getDisplays();
  }
  
  @ReactMethod
  public void show(String msg) {
    Display[] displays = this.getDisplays();
    if (displays.length > 1) {
      Toast.makeText(getReactApplicationContext(), "正在启动副屏", Toast.LENGTH_LONG).show();
      textDisplay = new TextDisplay(getReactApplicationContext(), displays[1]);
      textDisplay.show();
      textDisplay.update(msg);
    }
  }

}