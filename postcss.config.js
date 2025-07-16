import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    autoprefixer,
    postcssPresetEnv({
      stage: 3, // Включает стабильные фичи CSS
      features: {
        'nesting-rules': true // Включает вложенные правила
      },
    }),
  ],
};