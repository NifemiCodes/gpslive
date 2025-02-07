import { StyleSheet, View } from 'react-native';
import React from 'react';
import 'react-native-get-random-values';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface SearchBar {
  handlePress: (details: GooglePlaceDetail) => void;
}

const SearchBar = ({ handlePress }: SearchBar) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{ key: process.env.GOOGLE_MAPS_API_KEY, language: 'en' }}
        placeholder="Enter destination"
        fetchDetails={true}
        onPress={(data, details) => handlePress(details as GooglePlaceDetail)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 15,
    marginBottom: 0,
    borderRadius: 6,
  },
});
