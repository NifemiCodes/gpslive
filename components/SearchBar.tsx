import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface SearchBar {
  handlePress: () => void;
}

const SearchBar = ({ handlePress }: SearchBar) => {
  return (
    <View style={styles.container}>
      <EvilIcons name="search" color={'black'} size={24} />

      <GooglePlacesAutocomplete
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY, language: 'en' }}
        placeholder="Enter destination"
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {},
});
