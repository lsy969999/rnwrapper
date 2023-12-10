import React, {useEffect, useRef, useState} from 'react';
import {Button, View} from 'react-native';
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

  const onMessageHandle = async (event: any) => {
    const {data} = event.nativeEvent;
    const {type, msg} = JSON.parse(data);
    console.log(`onMessageHandle_ data: ${data}`);
    if (type === 'postMessage') {
      postMessage({
        test: 'test',
        ...msg,
      });
    }
  };

  const postMessage = (data: any) => {
    wvRef.current.postMessage(JSON.stringify(data));
  };

  return (
    <WebView
      style={{flex: 1}}
      ref={setWvRef}
      userAgent={ua}
      webviewDebuggingEnabled={true}
      source={{uri: 'http://192.168.25.35:8080'}}
      onMessage={onMessageHandle}
    />
  );
};

export default HomeScreen;
