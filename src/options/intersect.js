import {limitNodes} from '../limit-nodes';

export default {
	'intersect': function({survey}) {
		if(!survey.subjects || survey.subjects.length === 0)
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

		let nodes = limitNodes({scopes: survey.subjects, ...survey});

		survey.targets = nodes.containers;

		return survey;
	}
};