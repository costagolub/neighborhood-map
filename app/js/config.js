require.config({
	deps: ['main'],
	baseUrl: 'app/js',
	paths: {
		'knockout': '../../bower_components/knockout/dist/knockout',
		'async': '../../bower_components/requirejs-plugins/src/async',
		'gmaps': 'load-map-async'
	},
	shim: {}
});