import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const StopButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={handlePress}>
      <Text style={styles.text}>Stop Tracking</Text>
    </TouchableOpacity>
  );
};

export default StopButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },

  text: {
    color: 'white',
  },
});
