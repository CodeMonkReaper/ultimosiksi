import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "io.ionic.starter",
  "appName": "registr.app",
  "webDir": "www",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "Camera": {}
  }
}

export default config;
