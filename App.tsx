import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Config from 'react-native-config';
import {WebView} from 'react-native-webview';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
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
