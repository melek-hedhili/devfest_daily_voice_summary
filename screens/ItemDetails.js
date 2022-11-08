import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import {NativeEventEmitter, NativeModules} from 'react-native';

const ItemDetails = ({navigation}) => {
  const {AlanManager, AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
  const route = useRoute();
  console.log(route.params?.data.description);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused

      /// Provide any params with json

      AlanManager.setVisualState({data: route.params?.data.description});
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={{height: 250}}
          resizeMode="cover"
          source={{
            uri: route.params?.data.urlToImage
              ? route.params?.data.urlToImage
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
          }}
          alt="Alternate Text"
        />

        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{route.params?.data.title}</Text>

          <Text style={styles.postDescription}>
            {route.params?.data.description}
          </Text>

          <Text style={styles.tags}>{route.params?.data.author}</Text>

          <Text style={styles.date}>{route.params?.data.publishedAt}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#00BFFF',
  },
  headerTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  postContent: {
    flex: 1,
    padding: 30,
  },
  postTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#767676',
  },
  postDescription: {
    fontSize: 16,
    marginTop: 10,
    color: '#767676',
  },
  tags: {
    color: '#00BFFF',
    marginTop: 10,
    color: '#767676',
  },
  date: {
    color: '#696969',
    marginTop: 10,
    color: '#767676',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#00BFFF',
  },
  profile: {
    flexDirection: 'row',
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    color: '#00BFFF',
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
});
