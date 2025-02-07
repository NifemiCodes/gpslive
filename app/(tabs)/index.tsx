import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchBar from '@/components/SearchBar';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Banner from '@/components/Banner';
import StopButton from '@/components/StopButton';

const index = () => {
  const [location, setLocation] = useState<LatLng>({ latitude: 0, longitude: 0 });
  const [destination, setDestination] = useState<LatLng>({ latitude: 0, longitude: 0 });
  const map = useRef<MapView>(null);

  const updateServer = async (lat: number, long: number) => {
    const response = await fetch('backendServerUrl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude: lat, longitude: long }),
    });

    const data = await response.json();
    // do something with the data recieved from the backend. There is no backend as this is just an assessment project
  };

  const getUserLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    setLocation(location.coords);
    //map.current?.animateCamera({ center: location.coords });
    map.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
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

  useEffect(() => {
    (async () => {
      await requestUserLocation();
    })();
  }, []);

  // handle place selection
  const handlePress = (details: GooglePlaceDetail) => {
    const coords = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    setDestination(coords);
  };

  const handleUserLocationUpdate = async (newLocation: Location.LocationObject) => {
    const { latitude, longitude } = newLocation.coords;
    setLocation({ latitude, longitude });

    // update backend server
    // await updateServer(latitude, longitude);
  };

  // effect for destination change
  useEffect(() => {
    let subscription: Location.LocationSubscription;

    if (destination.longitude === 0 && destination.latitude === 0) {
      return;
    }

    (async () =>
      (subscription = await Location.watchPositionAsync(
        { accuracy: Location.LocationAccuracy.High, distanceInterval: 5, timeInterval: 1000 },
        handleUserLocationUpdate
      )))();

    map.current?.fitToCoordinates([location, destination], {
      edgePadding: { top: 30, right: 70, left: 70, bottom: 30 },
    });

    return () => subscription.remove();
  }, [destination]);

  return (
    <View style={styles.container}>
      <SearchBar handlePress={handlePress} />

      {destination.latitude !== 0 && destination.longitude !== 0 && (
        <Banner bannerText="Destination Selected. Tracking Location..." />
      )}

      <MapView
        ref={map}
        provider={PROVIDER_GOOGLE}
        key={process.env.GOOGLE_MAPS_API_KEY}
        style={styles.map}
        showsUserLocation={false}
        showsCompass={false}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={location}
          title="My Location"
          description="This is your current location"
          pinColor="lightblue"
        />

        {destination.latitude !== 0 && destination.longitude !== 0 && (
          <>
            <Marker coordinate={destination} title="Destination" description="This is your end destination" />

            <MapViewDirections
              origin={location}
              destination={destination}
              apikey={process.env.GOOGLE_MAPS_API_KEY as string}
              strokeWidth={3}
              strokeColor="red"
            />
          </>
        )}
      </MapView>

      {destination.latitude !== 0 && destination.longitude !== 0 && (
        <StopButton handlePress={() => setDestination({ longitude: 0, latitude: 0 })} />
      )}
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
