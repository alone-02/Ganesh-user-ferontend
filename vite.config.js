import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  server:{
    proxy:{
      "/api": 'https://ganesh-ecom-back-end.onrender.com'
    }
  },
  plugins: [react()]
});
