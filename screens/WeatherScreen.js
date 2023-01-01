import {useRoute} from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {NativeEventEmitter, NativeModules} from 'react-native';

const {AlanManager, AlanEventEmitter} = NativeModules;
const WeatherScreen = ({navigation}) => {
  const route = useRoute();
  console.log('route', route.params.weather.current.weather[0].description);
  let icon = route.params.weather.current.weather[0].icon;
  const [city, setCity] = useState('Loading ...');
  const [state, setState] = useState('Loading ...');

  useEffect(() => {
    const city_name_url =
      'http://api.openweathermap.org/geo/1.0/reverse?lat=36.0123&lon=10.5149&appid=03be4bb5b66a0d881e227c0bda2241fd';
    fetch(city_name_url)
      .then(res => res.json())
      .then(respone => {
        console.log('response', respone);
        setCity(respone[0].local_names.fr);
        setState(respone[0].state);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const item = route.params?.weather;
      AlanManager.setVisualState({weatherNews: item});
    });
    return unsubscribe;
  }, [navigation, route]);
  // const getWeather = async () => {
  // const api_weather_key = '03be4bb5b66a0d881e227c0bda2241fd';
  //   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${route.params.latitude}&lon=${route.params.longitude}&appid=${api_weather_key}`;

  //   const apiOptions = {
  //     headers: {
  //       Authorization: `Bearer ${api_weather_key}`,
  //     },
  //   };
  //   const res = await fetch(url, apiOptions);
  //   const respone = await res.json();

  //   setData(respone);
  //   console.log('data', data);
  // };

  // getLocation().then(location => {
  //   dailyForecast({
  //     key: '49cc8c821cd2aff9af04c9f98c36eb74',
  //     lat: location.coords.latitude,
  //     lon: location.coords.longitude,
  //     unit: 'metric',
  //   }).then(e => {
  //     setData(e.current);
  //   });
  // });
  // console.log('data', data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="darkgray" />

      <ScrollView>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.title}>
            {city}/{state}
          </Text>
          <View>
            <Text style={{color: 'red'}}>
              {route.params.weather.current.timezone}
            </Text>
          </View>
        </View>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>
            {route.params.weather.current.temp} °C
          </Text>
        </View>
        <Text style={styles.currentDescription}>
          {route.params.weather.current.weather[0].description}
        </Text>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../assets/icons/temp.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              {route.params.weather.current.feels_like} °C
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Feels like
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../assets/icons/humidity.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              {route.params.weather.current.humidity}%
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Humidity
            </Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../assets/icons/visibility.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text
              style={{
                fontSize: 22,
                color: 'white',
                textAlign: 'center',
              }}>
              {route.params.weather.current.visibility}
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Visibility
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../assets/icons/windspeed.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              {route.params.weather.current.wind_speed} m/s
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Wind speed
            </Text>
          </View>
        </View>
        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image
              source={require('../assets/icons/sunrise.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              {new Date(
                1000 * route.params.weather.current.sunrise,
              ).toLocaleString()}
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Sunrise
            </Text>
          </View>

          <View style={styles.info}>
            <Image
              source={require('../assets/icons/sunset.png')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                marginLeft: 50,
              }}
            />
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              {new Date(
                route.params.weather.current.sunset * 1000,
              ).toLocaleString()}
            </Text>
            <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
              Sunset
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF6',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 0,
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  largeIcon: {
    width: 250,
    height: 200,
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#767676',
  },
  currentDescription: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#767676',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e96e50',
  },
});
