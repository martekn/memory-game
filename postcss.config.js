import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        "logical-properties-and-values": false,
        "text-decoration-shorthand": true,
      },
    }),
  ],
};
