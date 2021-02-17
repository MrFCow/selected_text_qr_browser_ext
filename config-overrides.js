const {
	override,
	overrideDevServer,
	addWebpackPlugin
} = require("customize-cra");
const CopyPlugin = require('copy-webpack-plugin');

const multipleEntry = require('react-app-rewire-multiple-entry')([
	{
		 // points to the popup entry point
		 entry: 'src/popup/index.js',
		 template: 'public/pages/popup.html',
		 outPath: 'pages/popup.html'
	},
	{
		 // points to the options page entry point
		 entry: 'src/options/index.js',
		 template: 'public/pages/options.html',
		 outPath: 'pages/options.html'
	}
]);

const devServerConfig = () => config => {
	return {
		 ...config,
		 // webpackDevService doesn't write the files to desk
		 // so we need to tell it to do so so we can load the
		 // extension with chrome
		 writeToDisk: true
	}
}

const copyPlugin = new CopyPlugin({
	patterns: [
		// copy assets
		{ from: 'public', to: '' },
		{ from: 'src/background.js', to: '' },
		// { from: 'src/content.js', to: '' }
		{ from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js' },
	]
})

module.exports = {
	webpack: override(
		 addWebpackPlugin(
				copyPlugin
		 ),
		 multipleEntry.addMultiEntry,
	),
	devServer: overrideDevServer(
		 devServerConfig()
	),

};
