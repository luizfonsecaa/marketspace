module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          allowUndefined: true,
          blacklist: null,
          moduleName: '@env',
          path: '.env',
          safe: false,
          whitelist: null,
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            '@api': './src/app/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@dtos': './src/dtos',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@layout': './src/layout',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@shared': './src/components/Shared',
            '@storage': './src/storage',
            '@store': './src/app/',
            '@utils': './src/utils',
          },
          root: ['./src'],
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  }
}
