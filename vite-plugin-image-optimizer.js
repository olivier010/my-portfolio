import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const DEFAULT_OPTIONS = {
  test: /\.(jpe?g|png|gif|tiff|webp|avif)$/i,
  exclude: undefined,
  include: undefined,
  includePublic: true,
  logStats: true,
  svg: {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            cleanupNumericValues: false,
            removeViewBox: false,
          },
        },
      },
      'prefixIds',
    ],
  },
  png: {
    quality: 80,
  },
  jpeg: {
    quality: 80,
  },
  jpg: {
    quality: 80,
  },
  webp: {
    lossless: false,
  },
  avif: {
    lossless: false,
  },
};

export const imageOptimizer = (options = {}) => {
  return ViteImageOptimizer({
    ...DEFAULT_OPTIONS,
    ...options,
  });
};

export default imageOptimizer;
