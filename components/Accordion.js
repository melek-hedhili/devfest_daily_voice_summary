import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  LayoutAnimation,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRef} from 'react';
import {toggleAnimation} from '../animations/toggleAnimation';

const Accordion = ({title, bodyText}) => {
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();

    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          toggleListItem();
        }}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={30}
              color={'#767676'}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={styles.body}>
          <Text style={{color: '#767676'}}>{bodyText}</Text>
        </View>
      )}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '2%',
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: '2%',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOpacity: 5,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 5,
  },
  title: {
    fontSize: 16,
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
