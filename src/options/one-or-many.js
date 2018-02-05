import forEach from '@arr/foreach';

export default {
	'one-or-many': function({target, survey}) {
		if(survey.targets.length === 0)
			throw new Error('Nothing found');

		if(survey.targets.length === 1)
		// {
		// let msg = "Found more than one. Please narrow down the selection or use #many\n\n";
		// forEach(survey.targets, t => msg += JSON.stringify(t.value) + "\n\n");
		// throw new Error(msg);
		// }
			survey.targets = survey.targets[0];
		// }

		return survey;
	}
};