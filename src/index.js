require('./defiant');
import extensions from './locators';

let {options:{key}} = extensions;

function locate(query) {
	return key(query);
}

function createGlanceJSON() {
	this.selector = (json, reference) => {
		let result = locate({label:reference, json});
		return result.length == 1 ? result[0] : result;
	};

	return this.selector;
}

export default new createGlanceJSON();
