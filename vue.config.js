module.exports = {
  baseUrl: '/WalouDiceGame',
  outputDir: './docs',
  pages: {
    index: {
      entry: 'src/app/waloo-dice-game/main.ts',
      template: 'src/app/waloo-dice-game/public/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
};
