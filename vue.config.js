const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const { defineConfig } = require('@vue/cli-service');

const version = JSON.parse(packageJson).version || '0.0.0';

process.env.VUE_APP_VERSION = version;

module.exports = defineConfig({
    publicPath: '/',
    outputDir: process.env.outputDir,
    transpileDependencies: true,
});
