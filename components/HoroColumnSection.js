import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Divider from './Divider';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 5,
  },
  title: {
    fontWeight: 'bold',
    color: '#767676',
  },
});

const HoroColumnSection = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Mood</Text>
        <Text style={{color: '#767676'}}>{data.mood}</Text>
      </View>

      <Divider />

      <View style={styles.row}>
        <Text style={styles.title}>Color</Text>
        <Text style={{color: '#767676'}}>{data.color}</Text>
      </View>

      <Divider />

      <View style={styles.row}>
        <Text style={styles.title}>Lucky Number</Text>
        <Text style={{color: '#767676'}}>{data.lucky_number}</Text>
      </View>

      <Divider />

      <View style={styles.row}>
        <Text style={styles.title}>Lucky Time</Text>
        <Text style={{color: '#767676'}}>{data.lucky_time}</Text>
      </View>
    </View>
  );
};

export default HoroColumnSection;
