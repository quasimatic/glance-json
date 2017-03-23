import {jsonSearch} from '../query';

export default {
	options: {
		'key': function({label, json}) {
			try {
				return jsonSearch(json, `//${label}`);
			}
			catch (e) {
				return [];
			}
		},
		'value': function({label, json}) {
			try {
				return jsonSearch(json, `//*[text()='${label}']`);
			}
			catch (e) {
				return [];
			}
		},
		'key-contains': function({label, json}) {
			try {
				return jsonSearch(json, `//*[contains(local-name(), '${label}')]`);
			}
			catch (e) {
				return [];
			}
		},
		'value-contains': function({label, json}) {
			try {
				return jsonSearch(json, `//*[contains(text(), '${label}')]`);
			}
			catch (e) {
				return [];
			}
		}

	}
};
