import 'dotenv/config'; 

export default ({ config }) => {
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;
  // TODO: before production build make this throw an error
  if (!clerkSecretKey) {
    console.warn('CLERK_SECRET_KEY environment variable is not set. Please check your .env file.');
  }

  return {
    ...config,
    name: "Canvas_Connect",
    slug: "Canvas_Connect",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.Canvas_Connect"
    },
    androidStatusBar: {
      barStyle: "light-content"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-secure-store",
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      clerkSecretKey: clerkSecretKey,
    }
  };
};