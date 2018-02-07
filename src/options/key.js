import reduce from '@arr/reduce';
import matchString from '../match-string';
import escapeRegex from '../escape-regex';

export default {
	'key': function({target, survey}) {
		if(target.options.indexOf('value') !== -1)
			return survey;

		let escapedLabel = escapeRegex(target.label);

		let search = new RegExp(matchString(escapedLabel, target.options), target.options.indexOf('case-sensitive') !== -1 ? '' : 'i');

		survey.targets = survey.targets.concat(reduce(Object.keys(survey.container.keyValuePairNodes), (r, k) => search.exec(k) !== null ? r.concat(survey.container.keyValuePairNodes[k]) : r, []));

		return survey;
	}
};