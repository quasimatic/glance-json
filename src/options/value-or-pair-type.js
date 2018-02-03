import reduce from '@arr/reduce/index';
import map from '@arr/map/index';

export default {
	'value-or-pair-type': function({target, survey}) {
		if(target.label === 'pair') {
			survey.targets = map(survey.scopes, r => r.parentNode);
		}
		else {
			survey.targets = survey.targets.map(r => {
				if(r.type === 'pair')
					return r.valueNode;

				return r;
			});
		}

		return survey;
	}
};