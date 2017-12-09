const path = require("path");

module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: { title: "Veritone Sample App" },
        devServer: {
          public: "local.veritone-sample-app.com",
          open: false, // open browser window when server starts
          port: 3000,
          publicPath: "/",
          proxy: {
            "/auth": {
              "target": "http://local.veritone-sample-app.com:9000"
            }
          }
        }
      }
    ],
    [
      "neutrino-middleware-styles-loader",
      {
        cssModules: true,
        extractCSS: true,
        sourceMap: true,
        minimize: true
      }
    ],
    neutrino =>
      neutrino.config.resolve.alias
        .set("redux-api-middleware", "redux-api-middleware-fixed")
        .set("modules", path.join(__dirname, "src/modules"))
        .set("@helpers", path.join(__dirname, "src/helpers"))
        .set(
          "shared-components",
          path.join(__dirname, "src/shared-components")
        ),
    neutrino => neutrino.config.devtool("cheap-module-source-map")
  ]
};
