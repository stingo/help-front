module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/help-center/articles',
        destination: 'http://127.0.0.1:8000/api/help-center/articles',
      },
      {
        source: '/api/help-center/articles/:slug/',
        destination: 'http://127.0.0.1:8000/api/help/:slug/', // 🔥 Important: points to your Django route
      },
    ];
  },
};