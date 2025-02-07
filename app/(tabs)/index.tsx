import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchBar from '@/components/SearchBar';

const index = () => {
  const [location, setLocation] = useState<LatLng>({ latitude: 0, longitude: 0 });
  const [destination, setDestination] = useState<LatLng>({ latitude: 0, longitude: 0 });
  const map = useRef<MapView>(null);

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    setLocation(location.coords);
    map.current?.animateCamera({ center: location.coords });
  };

  const requestUserLocation = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();

    if (!granted) {
      // permission not granted yet. Request location permission.
      const response = await Location.requestForegroundPermissionsAsync();

      if (response.granted) {
        // permission granted. Get user Location.
        await getUserLocation();
        return;
      }
    }

    // Permission already granted, no need to request. Get user location.
    await getUserLocation();
  };

  let count = 0;
  const handleUserLocationChange = async (newLocation: Location.LocationObject) => {
    count += 1;
    console.log('location update!', count);
    setLocation(newLocation.coords);
    map.current?.animateCamera({ center: newLocation.coords, zoom: 17 });
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      await requestUserLocation();
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.Balanced, distanceInterval: 10000 },
        handleUserLocationChange
      );
    })();

    () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar handlePress={() => console.log('selected')} />

      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        key={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        camera={{ center: location, zoom: 17, pitch: 0, heading: 0 }}
        showsUserLocation
        showsCompass={false}>
        <Marker coordinate={location} title="My Location" description="This is your current location" />
        <Marker coordinate={destination} title="Destination" description="This is your final destination" />
      </MapView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
