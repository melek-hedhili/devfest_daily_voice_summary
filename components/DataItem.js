import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Divider, Image} from 'native-base';
import React from 'react';
import {useNavigation} from '@react-navigation/core';

const DataItem = ({data}) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.newsContainer}>
        <Image
          width={550}
          height={250}
          resizeMode={'cover'}
          source={{
            uri:
              data?.urlToImage != null
                ? data?.urlToImage
                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
          }}
          alt="Alternate Text"
        />
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.date}>
          <Text>time:{data?.publishedAt}</Text>
        </Text>
        <Text style={styles.newsDescription}>{data?.description}</Text>
      </View>
      <Button onPress={() => navigation.navigate('ItemDetails', {data: data})}>
        <Text>View</Text>
      </Button>
      <Divider my={2} bg="#e0e0e0" />
    </View>
  );
};

export default DataItem;

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
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '600',
    color: '#767676',
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 10,
    color: '#767676',
  },
  date: {
    fontSize: 14,
    color: '#767676',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
});
