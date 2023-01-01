import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {GET} from '../../Services/API';
import {POSTER_IMAGE} from '../../utils/config';
import Styles from '../../utils/Styles';
import Loader from './Loader';
import * as RootNavigation from '../../RootNavigation.js';

const TrendingMovies = ({url, title, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();

  useEffect(() => {
    const getMovies = async () => {
      const data = await GET(url);
      setMovies(data.results);
      setLoading(false);
    };

    getMovies();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Text style={Styles.heading}>{title}</Text>
          <FlatList
            keyExtractor={item => item.id}
            data={movies}
            horizontal
            renderItem={item => displayMovies(item)}
          />
        </View>
      )}
    </View>
  );
};
const displayMovies = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.push('movieDetails', {movieId: item.id});
      }}
      style={{marginHorizontal: 10}}>
      <Image
        source={{uri: `${POSTER_IMAGE}${item.poster_path}`}}
        style={Styles.posterImage}
      />
      <Text style={Styles.movieTitle}>{item.original_title}</Text>
    </TouchableOpacity>
  );
};

export default TrendingMovies;
