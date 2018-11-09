package com.sipin.salescloudandroid.screen;


import android.os.Handler;
import android.os.Message;
import android.util.SparseArray;

import java.util.HashMap;
import java.util.Map;

public class BasePresentationHelper {
    private static final String TAG = BasePresentationHelper.class.getName();

    private SparseArray<BasePresentation> sparseArray;

    private static volatile BasePresentationHelper helper;

    private int key = -1;
    private int lastKey = -1;
    private Handler handler=new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            if(sparseArray==null||sparseArray.size()==0){
                return ;
            }
            if(sparseArray.get(lastKey)==null){
                lastKey = msg.what;
                return;
            }
            if(lastKey==msg.what){
                return;
            }
            if (lastKey == 0 && msg.what > 0) {
                sparseArray.get(0).hide();
            }
            if (lastKey > 0) {
                sparseArray.get(lastKey).dismiss();
            }
            lastKey = msg.what;
        }
    };
    public static BasePresentationHelper getInstance() {
        BasePresentationHelper basePresentationHelper = helper;
        if (helper == null) {
            synchronized (BasePresentationHelper.class) {
                basePresentationHelper = helper;
                if (helper == null) {
                    basePresentationHelper = new BasePresentationHelper();
                    helper = basePresentationHelper;
                }
            }
        }
        return basePresentationHelper;
    }

    private BasePresentationHelper() {
        sparseArray = new SparseArray<>();
    }

    public int add(BasePresentation basePresentation) {
        key++;
        sparseArray.put(key, basePresentation);
        return key;
    }

    public void hide(BasePresentation basePresentation) {

    }

    public void show(int i) {
        handler.sendEmptyMessageDelayed(i,200);
    }

    public void dismissAll() {
        if (sparseArray == null || sparseArray.size() == 0) {
            return;
        }
        for (int i = 0; i < sparseArray.size(); i++) {
            int key=sparseArray.keyAt(i);
            if(sparseArray.get(key)!=null) {
                sparseArray.get(key).dismiss();
            }
        }
        sparseArray.clear();
        handler.removeCallbacksAndMessages(null);
    }

}