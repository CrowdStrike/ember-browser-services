"use strict";

const { resolve } = require;

module.exports = {
  plugins: [
    [
      resolve("@babel/plugin-transform-typescript"),
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
        // Default enums are IIFEs
        optimizeConstEnums: true,
      },
    ],
  ],
};
