const { getTransformer } = require('ts-transform-graphql-tag');

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig();
  config.module.rules = [
    {
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      options: {
        // ... other loader's options
        getCustomTransformers: () => ({ before: [getTransformer()] }),
      },
    },
  ];
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config);
};
