import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.asistencia.app',
  appName: 'RH IS',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    'GoogleMaps': {
      apiKey: 'AIzaSyDcL5vru8y0uvP964n4IqyIjbvtvIlmrMY'
    }
  }
};

export default config;
