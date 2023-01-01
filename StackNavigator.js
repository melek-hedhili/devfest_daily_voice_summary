import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ItemDetails from './screens/ItemDetails';
import HoroscopeScreen from './screens/HoroscopeScreen';
import WeatherScreen from './screens/WeatherScreen';
import MovieScreen from './screens/MovieScreen';
import MovieDetails from './components/MoviesComponents/MovieDetails';
import NewsScreen from './screens/NewsScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen">
      <Stack.Group>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="HoroscopeScreen" component={HoroscopeScreen} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
        <Stack.Screen name="MovieScreen" component={MovieScreen} />
        <Stack.Screen name="movieDetails" component={MovieDetails} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
