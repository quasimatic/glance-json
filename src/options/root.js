export default {
	'root': function({target, survey}) {
		if(target.label !== '')
			return survey;

		survey.targets = survey.targets.concat([survey.container.root]);

		return survey;
	}
};