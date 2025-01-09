import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";


export default defineConfig({
  server:{
    proxy:{
      "/api": 'https://ganesh-ecom-back-end.onrender.com/api/'
    }
  },
  plugins: [react()]
});
