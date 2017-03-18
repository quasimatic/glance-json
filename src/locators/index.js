import {jsonSearch} from '../query';

export default {
	options: {
		"key": function({label, json}) {
			try {
				return jsonSearch(json, `//${label}`)
			}
			catch(e) {
				console.log(e);
				return [];
			}
		},
		"value": function({label, json}) {
			try {
				return jsonSearch(json, `//*[text()='${label}']`)
			}
			catch(e) {
				console.log(e);
				return [];
			}
		}

	}
}
