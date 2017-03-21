require('./defiant');
import extensions from './locators';

let {options} = extensions;

function locate(query) {
	let result = [];
	result = result.concat(options['key'](query));
	result = result.concat(options['value'](query));
	result = result.concat(options['contains-key'](query));
	result = result.concat(options['contains-value'](query));

	console.log(result)
	return [...new Set(result)];
}

function createGlanceJSON() {
	this.selector = (json, reference) => {
		let result = locate({label:reference, json});
		return result.length == 1 ? result[0] : result;
	};

	return this.selector;
}

export default new createGlanceJSON();
