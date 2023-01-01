import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import {FlatList, Spinner} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/core';
import DataItem from '../components/DataItem';
import {NativeEventEmitter, NativeModules} from 'react-native';

const NewsScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const {AlanManager, AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
  useEffect(() => {
    const getNewsFromNewsApiWithArguments = async search => {
      console.log('route', route.params.search);
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
    alanEventEmitter.addListener('onCommand', e => {
      if (e.command == 'search') {
        getNewsFromNewsApiWithArguments(e.name);
      }
    });
    getNewsFromNewsApiWithArguments(route.params.search);
  }, []);

  return (
    <SafeAreaView>
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

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    backgroundColor: '#e7e7e7',
  },
  spinner: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
