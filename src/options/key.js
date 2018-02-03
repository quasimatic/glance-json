import reduce from '@arr/reduce';

export default {
	'key': function({target, survey}) {
		let escapedLabel = RegExp.escape(target.label);

		let matchString = target.options.indexOf('exact-text') !== -1 ? `^${escapedLabel}$` : escapedLabel;

		let search = new RegExp(matchString, target.options.indexOf('case-sensitive') !== -1 ? '' : 'i');

		survey.targets = survey.targets.concat(reduce(Object.keys(survey.container.keyValuePairNodes), (r, k) => search.exec(k) !== null ? r.concat(survey.container.keyValuePairNodes[k]) : r, []));

		return survey;
	}
};