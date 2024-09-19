// Documentacion: https://capacitorjs.com/docs/config

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nextgeneration.genqr',
  appName: 'Generator QR Master',
  webDir: 'dist',
  loggingBehavior: 'production', // 'none' | 'debug' | 'production';
  android: {
    path: 'android',
    loggingBehavior: 'production', // 'none' | 'debug' | 'production';
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
};

export default config;
