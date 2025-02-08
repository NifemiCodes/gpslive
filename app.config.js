module.exports = ({ config }) => ({
  expo: {
    'name': 'GPSLive',
    'slug': 'GPSLive',
    'version': '1.0.0',
    'orientation': 'portrait',
    'icon': './assets/images/app-icon.png',
    'scheme': 'myapp',
    'userInterfaceStyle': 'automatic',
    'newArchEnabled': true,
    'ios': {
      'supportsTablet': true,
    },
    'android': {
      'config': {
        'googleMaps': {
          'apiKey': process.env.GOOGLE_MAPS_API_KEY,
        },
      },

      'adaptiveIcon': {
        'foregroundImage': './assets/images/app-icon.png',
        'backgroundColor': '#ffffff',
      },
      'permissions': ['android.permission.ACCESS_COARSE_LOCATION', 'android.permission.ACCESS_FINE_LOCATION'],
      'package': 'com.nifemicodes.GPSLive',
    },
    'web': {
      'bundler': 'metro',
      'output': 'static',
      'favicon': './assets/images/favicon.png',
    },
    'plugins': [
      'expo-router',
      [
        'expo-splash-screen',
        {
          'image': './assets/images/splash-screen.png',
          'imageWidth': 200,
          'resizeMode': 'contain',
          'backgroundColor': '#ffffff',
        },
      ],
      [
        'expo-location',
        {
          'locationAlwaysAndWhenInUsePermission': 'Allow GPSLive to access your location',
        },
      ],
    ],
    'experiments': {
      'typedRoutes': true,
    },
    'extra': {
      'router': {
        'origin': false,
      },
      'eas': {
        'projectId': 'e488bcda-5b5c-4225-b1a3-d5f4fe34d193',
      },
    },
  },
});
