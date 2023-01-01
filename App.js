/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import HomeScreen from './screens/HomeScreen';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import {navigationRef} from './RootNavigation';
import * as RootNavigation from './RootNavigation.js';

const App = () => {
  return (
    <>
      <NativeBaseProvider>
        <NavigationContainer ref={navigationRef}>
          <StackNavigator />
          <AlanView projectid={process.env.ALAN_AI_KEY} />
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default App;
