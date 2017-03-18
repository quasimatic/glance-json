import {jsonSearch} from '../query';

export default {
	options: {
		"key": function({label, json}) {
			return jsonSearch(json, `//${label}`)
		}
	}
}
