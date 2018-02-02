import reduce from '@arr/reduce';

export default {
	name: 'in-key',
	locate: function({target, survey}) {
		let escapedLabel = RegExp.escape(target.label);

		let matchString = target.options.indexOf('exact-text') !== -1 ? `^${escapedLabel}$` : escapedLabel;

		let search = new RegExp(matchString, target.options.indexOf('case-sensitive') !== -1 ? '' : 'i');

		return reduce(Object.keys(survey.container.keyValuePairNodes), (r, k) => search.exec(k) !== null ? r.concat(survey.container.keyValuePairNodes[k]) : r, []);
	}
};