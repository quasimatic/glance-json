import {jsonSearch} from '../query';

export default {
	options: {
		'key': function({label, json}) {
			try {
				return jsonSearch(json, `//${label}`);
			}
			catch (e) {
				console.log(e);
				return [];
			}
		},
		'value': function({label, json}) {
			try {
				return jsonSearch(json, `//*[text()='${label}']`);
			}
			catch (e) {
				console.log(e);
				return [];
			}
		},
		'contains-key': function({label, json}) {
			try {
				return jsonSearch(json, `//*[contains(local-name(), '${label}')]`);
			}
			catch (e) {
				console.log(e);
				return [];
			}
		},
		'contains-value': function({label, json}) {
			try {
				return jsonSearch(json, `//*[contains(text(), '${label}')]`);
			}
			catch (e) {
				console.log(e);
				return [];
			}
		}

	}
};
