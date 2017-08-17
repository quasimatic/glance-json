export default {
	options: {
		'key': function({label}) {
			return `local-name()='${label}'`;
		},
		'value': function({label}) {
			return `.//text()='${label}'`;
		},
		'key-contains': function({label}) {
			return `contains(local-name(), '${label}')`;
		},
		'value-contains': function({label}) {
			return `.//text()[contains(., '${label}')]`;
		}
	}
};
