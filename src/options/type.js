import filter from '@arr/filter';

export default {
	'type': function({target, survey}) {
		if(target.options.indexOf('property') !== -1) {
			return survey;
		}

		if(target.label === 'pair' && survey.scopes && survey.scopes.length > 0) {
			survey.targets = filter(survey.scopes, r => {
				return r.type === 'pair';
			});
		}

		if(target.label === 'key') {
			survey.targets = survey.container.keyNodes;
		}

		if(target.label === 'value') {
			survey.targets = survey.container.valueNodes;
		}

		if(['string', 'boolean', 'number', 'function', 'object', 'array'].indexOf(target.label) !== -1) {
			survey.targets = filter([].concat(survey.container.valueNodes, survey.container.containerNodes), r => {
				return r.type === target.label;
			});
		}

		return survey;
	}
};
