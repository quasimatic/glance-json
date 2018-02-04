import reduce from '@arr/reduce/index';
import map from '@arr/map/index';

export default {
	'value-type': function({target, survey}) {
		survey.targets = survey.targets.map(r => {
			if(r.type === 'pair')
				return r.valueNode;

			return r;
		});

		return survey;
	}
};