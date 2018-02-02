import reduce from '@arr/reduce/index';

export default {
	name: 'in-value',
	locate: function({target, survey}) {
		let escapedLabel = RegExp.escape(target.label);

		let matchString = target.options.indexOf('exact-text') !== -1 ? `^${escapedLabel}$` : escapedLabel;

		let search = new RegExp(matchString, target.options.indexOf('case-sensitive') !== -1 ? '' : 'i');

		return reduce(survey.container.valueNodes, (r, v) => search.exec(v.value) !== null ? r.concat(v) : r, []);
	}
};