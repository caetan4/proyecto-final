export default {
  root: 'src',

  server: {
    host: true,
    port: 5173,
    strictPort: true
  },

  optimizeDeps: {
    exclude: ['three', '@splinetool/loader']
  }
};
