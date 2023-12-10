import React, {useEffect, useRef, useState} from 'react';
import {Button, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import Config from 'react-native-config';
import {getUserAgent, getVersion} from 'react-native-device-info';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <Button title="Go to Test" onPress={() => navigation.push('Test')} />
      <View style={{flex: 1}}>
        <MyWebView />
      </View>
    </View>
  );
};

const MyWebView = () => {
  const wvRef: any = useRef();
  const [ua, setUa] = useState('');

  const setWvRef = (ref: any) => {
    wvRef.current = ref;
  };
  useEffect(() => {
    const setWvUserAgent = async () => {
      const userAgent = await getUserAgent();
      const version = getVersion();
      const appName = Config.RNW_APP_NAME;
      const result = `${userAgent} -rnw-${appName}/${version}-`;
      setUa(result);
    };
    setWvUserAgent();
  }, []);
  return (
    <WebView
      style={{flex: 1}}
      ref={setWvRef}
      userAgent={ua}
      webviewDebuggingEnabled={true}
      source={{uri: 'http://192.168.25.35:8080'}}
    />
  );
};

export default HomeScreen;
