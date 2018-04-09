export default {
	'intersect': function({survey}) {
		if(!survey.subjects)
			return survey;

		//
		// Find subjects and targets that are the same
		//
		let matches = [];
		for (let subject of survey.subjects) {
			for (let target of survey.targets) {
				if(target === subject)
					matches.push(target);
			}
		}

		if(matches.length > 0) {
			survey.targets = matches;
			return survey;
		}

		//
		// Find ancestor containing subject and targets
		//
		let commonAncestors = [];

		for (let parentIndex = 0; ; ++parentIndex) {
			let currentAncestors = [];

			for (let subject of survey.subjects) {
				if(!subject.ancestors[parentIndex])
					break;

				for (let target of survey.targets) {
					if(target.ancestors[parentIndex] === subject.ancestors[parentIndex])
						currentAncestors.push(target.ancestors[parentIndex]);
				}
			}

			if(currentAncestors.length === 0)
				break;

			commonAncestors = currentAncestors;
		}

		if(commonAncestors.length !== 0)
			survey.targets = commonAncestors;

		return survey;
	}
};