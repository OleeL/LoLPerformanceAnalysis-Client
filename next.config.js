module.exports = {
    devIndicators: {
        autoPrerender: false,
    },

    compress: true,
    webpack: (config, { isServer }) => {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      }
  
      return config
    }
};
