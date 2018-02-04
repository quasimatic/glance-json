export default {
	'indexer': {
		check: function({option}) {
			if(isNaN(parseInt(option)))
				return false;
			return true;
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
	}
};
