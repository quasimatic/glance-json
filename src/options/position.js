export default {
	'indexer': {
		check: function({option}) {
			return !isNaN(parseInt(option));
		},
		execute({target, option, survey}) {
			let index = parseInt(option);

			if(index === 0) {
				throw new Error('Position 0 not supported please start with 1 or -1');
			}
			if(index > 0) {
				if(survey.targets.length < index)
					throw new Error(`Position ${index} is out of range there was only ${survey.targets.length} found`);

				survey.targets = [survey.targets[index - 1]];
			}
			else {
				if(survey.targets.length < Math.abs(index))
					throw new Error(`Position ${index} is out of range there was only ${survey.targets.length} found`);

				survey.targets = [survey.targets[survey.targets.length + index]];
			}

			return survey;
		}
	},
	'first': function({survey}) {
		if(survey.targets.length === 0)
			throw new Error('Cannot get first item, no items found');

		survey.targets = [survey.targets[0]];
		return survey;
	},
	'last': function({survey}) {
		if(survey.targets.length === 0)
			throw new Error('Cannot get last item, no items found');

		survey.targets = [survey.targets[survey.targets.length - 1]];
		return survey;
	}
};
