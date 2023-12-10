package com.rnwrapper.modules;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ModuleTestModule extends ReactContextBaseJavaModule {
    public ModuleTestModule(ReactApplicationContext context) {
        super(context);
    }
    @NonNull
    @Override
    public String getName() {
        return "ModuleTestModule";
    }

    @ReactMethod
    public void createTestLogEvent(String prefix, String text) {
        Log.d(prefix, "createTestLogEvent: " + text);
    }

    @ReactMethod
    public void createTestPromiseEvent(String text, Promise promise) {
        Log.d("ModuleTestModule", "createTestPromiseEvent: " + text);
        try {
            promise.resolve(text + "from aos");
        } catch (Exception e) {
            promise.reject("Create Event Error", e);
        }
    }

    @ReactMethod
    public void createTestPromiseRejectEvent(String text, Promise promise){
        Log.d("ModuleTestModule", "createTestPromiseRejectEvent: " + text);
        try {
            throw new RuntimeException("Test");
//            promise.resolve(text + "from aos");
        } catch (Exception e) {
            Log.d("ModuleTestModule", "test test test: ");
            promise.reject("Create Event Error", e);
        }
    }

//    private int listenerCount = 0;
    @ReactMethod
    public void addListener(String eventName) {
//        if (listenerCount == 0) {
//            // Set up any upstream listeners or background tasks as necessary
//        }
//
//        listenerCount += 1;
    }
    @ReactMethod
    public void removeListeners(Integer count) {
//        listenerCount -= count;
//        if (listenerCount == 0) {
//            // Remove upstream listeners, stop unnecessary background tasks
//        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void createTestSendEvent(){
        Log.d("ModuleTestModule", "createTestSendEvent: ");
        WritableMap params = Arguments.createMap();
        params.putString("eventProperty", "someValue");
        sendEvent(this.getReactApplicationContext(), "EventReminder", params);
    }
}
