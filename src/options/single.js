import map from '@arr/map';

export default {
	'single': function({target, survey}) {
		if(target.options.indexOf('many') !== -1)
			return survey;

		if(survey.targets.length === 0)
			throw new Error("Nothing found");

		if(survey.targets.length > 1)
			throw new Error("Found more than one. Please narrow down the selection or use #many\n\n" + Array.join(map(survey.targets, t => JSON.stringify(t.value) + "\n\n"), ''));

		survey.targets = survey.targets[0];

		return survey;
	}
};