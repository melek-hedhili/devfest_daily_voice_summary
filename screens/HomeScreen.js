import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import {FlatList, Spinner} from 'native-base';
import {SearchBar, Button} from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import DataItem from '../components/DataItem';
import * as RootNavigation from '../RootNavigation.js';
import {NativeEventEmitter, NativeModules} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
const HomeScreen = () => {
  const [weather, setWeather] = useState();
  //const route = useRoute();
  //console.log('route', route);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {AlanManager, AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

  NewApiKey = 'be292fc8d6fd4891830d29b8a1f0cc8e';

  useEffect(() => {
    alanEventEmitter.addListener('onCommand', e => {
      //console.log(`onCommand: ${JSON.stringify(e)}`);
      if (e.command == 'goBack') {
        RootNavigation.navigate('HomeScreen');
      } else if (e.command == 'search') {
        setSearch(e.name);
        getNewsFromNewsApiWithArguments(e.name);
      } else if (e.command == 'horoscope') {
        RootNavigation.navigate('HoroscopeScreen', {
          data: e.data,
          horoscopeTitle: e.horoscopeTitle,
        });
      } else if (e.command == 'weather') {
        getLocation().then(location => {
          dailyForecast({
            key: '895284fb2d2c50a520ea537456963d9c',
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            unit: 'metric',
          }).then(data => {
            console.log('data', data.current.temp);
            const weather = data;
            RootNavigation.navigate('WeatherScreen', {
              weather: weather,
            });
          });
        });
      }
    });
  }, []);
  // const getOneTimeLocation = () => {
  //   setLocationStatus('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     position => {
  //       setLocationStatus('You are Here');

  //       //getting the Longitude from the location json
  //       const currentLongitude = JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Longitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     error => {
  //       setLocationStatus(error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000},
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     position => {
  //       //Will give you the location on location change

  //       setLocationStatus('You are Here');
  //       console.log(position);

  //       //getting the Longitude from the location json
  //       const currentLongitude = JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     error => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000,
  //     },
  //   );
  // };
  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //         } else {
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //       console.log(locationStatus, currentLatitude, currentLongitude);
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);

  const getNewsFromNewsApi = async () => {
    setLoading(true);
    const newsapi = `https://newsapi.org/v2/everything?q=${search}&apiKey=be292fc8d6fd4891830d29b8a1f0cc8e`;
    const apiOptions = {
      headers: {
        Authorization: `Bearer ${NewApiKey}`,
      },
    };
    return fetch(newsapi, apiOptions)
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
      .finally(() => setLoading(false));
  };
  const getNewsFromNewsApiWithArguments = async search => {
    setLoading(true);
    const newsapi = `https://newsapi.org/v2/everything?q=${search}&apiKey=be292fc8d6fd4891830d29b8a1f0cc8e`;
    const apiOptions = {
      headers: {
        Authorization: `Bearer ${NewApiKey}`,
      },
    };
    return fetch(newsapi, apiOptions)
      .then(res => res.json())
      .then(json => {
        setData(json);
      })
      .finally(() => setLoading(false));
  };
  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Type here ..."
        value={search}
        lightTheme
        onChangeText={e => setSearch(e)}
      />
      <Button title={'Search...'} onPress={getNewsFromNewsApi} />

      {Object.keys(data).length > 0 ? (
        <FlatList
          data={data.articles}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item, index}) => <DataItem data={item} key={index} />}
        />
      ) : loading ? (
        <View style={styles.spinner}>
          <Spinner color="danger.400" />
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
