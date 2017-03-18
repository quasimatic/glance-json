require('./defiant');
import extensions from './locators';

let {options:{key,value}} = extensions;

function locate(query) {
	let result = [];
	result = result.concat(key(query));
	result = result.concat(value(query));
	return result;
}

function createGlanceJSON() {
	this.selector = (json, reference) => {
		let result = locate({label:reference, json});
		return result.length == 1 ? result[0] : result;
	};

	return this.selector;
}

export default new createGlanceJSON();
