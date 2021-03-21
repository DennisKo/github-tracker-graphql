module.exports = {
  client: {
    service: {
      name: 'github-tracker',
      url: 'https://api.github.com/graphql',
      headers: {
        authorization: 'Bearer <GH_TOKEN>',
      },
      includes: ['./src/**/*.tsx', './src/**/*.ts'],
      excludes: ['**/__tests__/**'],
    },
  },
};
