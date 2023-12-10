import React, { useEffect } from 'react';
import {
  Button,
  NativeEventEmitter,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import {WebView} from 'react-native-webview';
import {NativeModules} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const {ModuleTestModule} = NativeModules;
  const onPress = () => {
    ModuleTestModule.createTestLogEvent('testName', 'testLocation');
  };

  const onPress2 = async () => {
    try {
      const event = await ModuleTestModule.createTestPromiseEvent('testName');
      console.log(event);
    } catch (e) {
      console.error(e);
    }
  };

  const onPress3 = async () => {
    try {
      const event = await ModuleTestModule.createTestPromiseRejectEvent(
        'testName',
      );
      console.log(event);
    } catch (e) {
      console.log(e);
      console.error(e);
    }
  };

  const onPress4 = () => {
    ModuleTestModule.createTestSendEvent();
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ModuleTestModule);
    let eventListener = eventEmitter.addListener('EventReminder', event => {
      console.log(event.eventProperty);
    });
    return () => {
      eventListener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title="createTestLogEvent" color="#841584" onPress={onPress} />
      <Button
        title="createTestPromiseEvent"
        color="#841584"
        onPress={onPress2}
      />
      <Button
        title="createTestPromiseRejectEvent"
        color="#841584"
        onPress={onPress3}
      />
      <Button
        title="Click to invoke your native module!4"
        color="#841584"
        onPress={onPress4}
      />
      <View style={{flex: 1}}>
        <Text>asdf {Config.test}</Text>
        <MyWebView />
      </View>
    </SafeAreaView>
  );
}

const MyWebView = () => {
  return (
    <WebView
      style={{flex: 1}}
      webviewDebuggingEnabled={true}
      source={{uri: 'http://192.168.25.35:8080'}} />
  );
};

export default App;
