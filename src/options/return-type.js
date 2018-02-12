import map from '@arr/map';
import filter from '@arr/filter/index';

export default {
	'return-type': function({target, survey}) {
		if(target.options.indexOf('property') !== -1)
			return survey;

		if(target.options.indexOf('type') === -1 && survey.remainingTargets[survey.remainingTargets.length - 1].indexOf(target) !== -1) {
			survey.subjects = Array.from(new Set(map([].concat(survey.subjects), r => {
				if(r.type === 'pair')
					return r.valueNode;

				return r;
			})));
		}

		if(target.label === 'pair' && survey.scopes && survey.scopes.length > 0) {
			survey.subjects = filter(survey.scopes, r => {
				return r.type === 'pair';
			});
		}

		return survey;
	}
};
