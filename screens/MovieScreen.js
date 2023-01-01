import {View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import DiscoverMovies from '../components/MoviesComponents/DiscoverMovies';
import Styles from '../utils/Styles';
import TrendingPeople from '../components/MoviesComponents/TrendingPeople';
import TrendingMovies from '../components/MoviesComponents/TrendingMovies';
const {AlanManager, AlanEventEmitter} = NativeModules;
const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);

const MovieScreen = ({navigation}) => {
  return (
    <View style={Styles.sectionBg}>
      <DiscoverMovies />
      <TrendingPeople title="Trending People" url="/trending/person/week" />
      <TrendingMovies title="Trending Movies" url="/movie/top_rated" />
    </View>
  );
};

export default MovieScreen;
