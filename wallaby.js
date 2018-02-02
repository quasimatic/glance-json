module.exports = function(wallaby) {
	return {
		files: [
			{pattern: 'node_modules/babel-polyfill/dist/polyfill.js', instrument: false},
			{pattern: 'node_modules/chai/chai.js', instrument: false},

			{pattern: 'src/**/*.js'},
			{pattern: '!src/**/*-spec.js', load: false},
			{pattern: 'test/**/*.js', load: false},
			{pattern: '!test/**/*-specs.js', load: false}
		],

		tests: [
			{pattern: 'src/**/*-spec.js'},
			{pattern: 'test/**/*-specs.js'}
		],

		compilers: {
			'**/*.js*': wallaby.compilers.babel({
				presets: ['es2015'],
				plugins: [
					'transform-object-rest-spread'
				],
				babel: require('babel-core')
			})
		},

		env: {
			type: 'node',
			runner: 'node'
		},

		testFramework: 'mocha',

		bootstrap: function() {
			require('babel-polyfill');
			global.expect = chai.expect;
			var should = chai.should();
		}
	};
};
