import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import CompatibilitySection from '../components/CompatibilitySection';
import HoroColumnSection from '../components/HoroColumnSection';
import horoscopeList from '../utils/constants';
import {NativeEventEmitter, NativeModules} from 'react-native';
const ClockIcon = require('../assets/icons/clock.png');
const HoroscopeScreen = ({navigation}) => {
  const {AlanManager, AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
  const route = useRoute();
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const item = route.params?.data;
      AlanManager.setVisualState({horoscopeData: item});
    });
    return unsubscribe;
  }, [navigation, route]);
  const original = horoscopeList.find(
    item => item.title === route.params.horoscopeTitle,
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.iconContainer(original.backgroundColor)}>
            <View style={styles.horoContainer}>
              <Image source={original.url} style={styles.image} />
              <View style={styles.chip}>
                <Text style={styles.chipText}>
                  {route.params?.data.date_range}
                </Text>
              </View>
              <View style={styles.chip}>
                <Image source={ClockIcon} style={styles.icon} />
                <Text style={styles.chipText}>
                  {route.params?.data.current_date}
                </Text>
              </View>
            </View>
          </View>

          {/* <DateSelector date={date} setDate={setDate} /> */}

          <View style={styles.generalSection}>
            <Text style={styles.generalTitle}>General Horoscope</Text>
            <Text style={styles.generalDescription}>
              {route.params?.data.description}
            </Text>

            <HoroColumnSection data={route.params?.data} />

            <CompatibilitySection
              originalTitle={route.params?.horoscopeTitle}
              compatTitle={route.params?.data.compatibility}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HoroscopeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconContainer: backgroundColor => ({
    backgroundColor: backgroundColor,
  }),
  horoContainer: {
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    margin: 10,
  },
  icon: {
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  chip: {
    borderRadius: 20,
    borderColor: '#404040',
    borderWidth: 1,
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  chipText: {
    marginStart: 5,
    color: 'black',
  },
  generalSection: {
    flex: 1,
    alignItems: 'center',
  },
  generalTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#767676',
  },
  generalDescription: {
    width: '90%',
    textAlign: 'center',
    color: '#767676',
  },
});
