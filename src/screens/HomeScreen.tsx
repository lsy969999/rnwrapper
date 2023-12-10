import React from 'react';
import {Button, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import Config from 'react-native-config';
const HomeScreen = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <Button title="Go to Test" onPress={() => navigation.push('Test')} />
      <View style={{flex: 1}}>
        <Text>asdf {Config.test}</Text>
        <MyWebView />
      </View>
    </View>
  );
};

const MyWebView = () => {
  return (
    <WebView
      style={{flex: 1}}
      webviewDebuggingEnabled={true}
      source={{uri: 'http://192.168.25.35:8080'}}
    />
  );
};

export default HomeScreen;
