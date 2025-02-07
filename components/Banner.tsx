import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Banner = ({ bannerText }: { bannerText: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{bannerText}</Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginTop: 5,
    zIndex: 1,
  },

  text: {
    color: 'red',
    textAlign: 'center',
  },
});
