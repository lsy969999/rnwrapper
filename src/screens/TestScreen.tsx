import React, {useEffect} from 'react';
import {
  Button,
  NativeEventEmitter,
  NativeModules,
  Text,
  View,
} from 'react-native';

const TestScreen = ({navigation}: any) => {
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
      console.log('test remove useEffect');
    };
  }, []);
  return (
    <View>
      <Text>TestScreen</Text>
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
      <Button title="Go to Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default TestScreen;
