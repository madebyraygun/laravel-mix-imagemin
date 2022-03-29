const ManifestPlugin = require('./ManifestPlugin.js');

class Imagemin {
    name() {
        return ['imagemin', 'images', 'img'];
    }

    dependencies() {
        this.requiresReload = `
            Imagemin's required plugins have been installed.
            Please run "npm run dev" again.
        `;

        return ['copy-webpack-plugin', 'imagemin-webpack-plugin'];
    }

    register(copyOptions = {}, imageminOptions = {}) {
        this.copyOptions = copyOptions;
        this.imageminOptions = Object.assign({
            test: /\.(jpe?g|png|gif|svg)$/i,
        }, imageminOptions);
    }

    webpackPlugins() {
        const ImageminPlugin = require('imagemin-webpack-plugin').default;
        const CopyWebpackPlugin = require('copy-webpack-plugin');
        let {copyOptions, imageminOptions} = this;

        return [
            new CopyWebpackPlugin(copyOptions),
            new ImageminPlugin(imageminOptions),
            new ManifestPlugin(copyOptions.patterns),
        ];
    }
}

module.exports = Imagemin;
