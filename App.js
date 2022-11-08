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
          <AlanView
            projectid={
              'cd4ff1a05f843a5dbdcb2f18c880efc42e956eca572e1d8b807a3e2338fdd0dc/stage'
            }
          />
        </NavigationContainer>
      </NativeBaseProvider>
    </>
  );
};

export default App;
