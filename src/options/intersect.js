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
		let commonAncestor;

		for (let parentIndex = 0; ; ++parentIndex) {
			let currentAncestor = null;

			for (let subject of survey.subjects) {
				if(!subject.ancestors[parentIndex])
					break;

				for (let target of survey.targets) {
					if(target.ancestors[parentIndex] === subject.ancestors[parentIndex])
						currentAncestor = target.ancestors[parentIndex];
				}
			}

			if(!currentAncestor)
				break;

			commonAncestor = currentAncestor;
		}

		if(commonAncestor)
			survey.targets = [commonAncestor];

		return survey;
	}
};