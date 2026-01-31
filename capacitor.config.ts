import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.onewaytosite.app',
  appName: 'SKTC GARDEN',
  webDir: 'dist', // <--- ต้องมีคอมม่าตรงนี้ครับ
  server: {
    androidScheme: 'https'
  }
};

export default config;