module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/_variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Cactus";
      return args;
    });
  }
};
