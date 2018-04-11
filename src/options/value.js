import reduce from '@arr/reduce/index';
import matchString from '../match-string';
import escapeRegex from '../escape-regex';

export default {
	'value': function({target, survey}) {
		if(target.label === '')
			return survey;
		
		if(target.options.indexOf('key') !== -1)
			return survey;

		let escapedLabel = escapeRegex(target.label);

		let search = new RegExp(matchString(escapedLabel, target.options), target.options.indexOf('case-sensitive') !== -1 ? '' : 'i');

		survey.targets = survey.targets.concat(reduce(survey.container.valueNodes.filter(c => !(c.type === 'function' || c.type === 'null' || c.type === 'undefined')), (r, v) => search.exec(v.value.toString()) !== null ? r.concat(v) : r, []));

		return survey;
	}
};