import reduce from '@arr/reduce';

export default {
	name: 'in-key',
	locate: function({target, survey}) {
		let matchString = target.options.indexOf('exact-text') !== -1 ? `^${target.label}$` : target.label;

		let search = new RegExp(matchString, target.options.indexOf('case-sensitive') !== -1 ? '' : 'i');

		return reduce(Object.keys(survey.container.keyValuePairNodes), (r, k) => search.exec(k) !== null ? r.concat(survey.container.keyValuePairNodes[k]) : r, []).flatten();
	}
};