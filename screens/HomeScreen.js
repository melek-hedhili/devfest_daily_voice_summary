import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import {FlatList, Spinner} from 'native-base';

import React, {useState, useEffect} from 'react';

import * as RootNavigation from '../RootNavigation.js';
import {NativeEventEmitter, NativeModules} from 'react-native';

import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
import Accordion from '../components/Accordion';
import Howto from '../utils/Howto';

const HomeScreen = () => {
  const {AlanManager, AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

  NewApiKey = 'be292fc8d6fd4891830d29b8a1f0cc8e';

  useEffect(() => {
    alanEventEmitter.addListener('onCommand', e => {
      //console.log(`onCommand: ${JSON.stringify(e)}`);
      if (e.command == 'goBack') {
        RootNavigation.navigate('HomeScreen');
      } else if (e.command == 'search') {
        RootNavigation.navigate('NewsScreen', {search: e.name});
      } else if (e.command == 'horoscope') {
        RootNavigation.navigate('HoroscopeScreen', {
          data: e.data,
          horoscopeTitle: e.horoscopeTitle,
        });
      } else if (e.command == 'weather') {
        console.log('Weather check');
        getLocation().then(location => {
          dailyForecast({
            key: '895284fb2d2c50a520ea537456963d9c',
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            unit: 'metric',
          })
            .then(data => {
              console.log('data', data);
              const weather = data;
              RootNavigation.navigate('WeatherScreen', {
                weather: weather,
              });
            })
            .catch(err => console.log('Weather error', err));
        });
      } else if (e.command == 'movies') {
        RootNavigation.navigate('MovieScreen');
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={Howto}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item}) => (
            <Accordion title={item.title} bodyText={item.body} />
          )}
        />

        <LottieView
          source={require('../assets/animation/chat-bot-animation.json')}
          autoPlay
          loop
          style={{width: 100, height: 100, alignSelf: 'center'}}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    backgroundColor: '#e7e7e7',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  newsContainer: {
    padding: 10,
  },
});
