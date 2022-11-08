import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ItemDetails from './screens/ItemDetails';
import HoroscopeScreen from './screens/HoroscopeScreen';
import WeatherScreen from './screens/WeatherScreen';

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
        <Stack.Screen name="ItemDetails" component={ItemDetails} />
        <Stack.Screen name="HoroscopeScreen" component={HoroscopeScreen} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
