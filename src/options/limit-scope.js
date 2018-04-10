import {limitNodes} from '../limit-nodes';

export default {
	'limit-scope': function({survey}) {
		let nodes = limitNodes(survey);

		if(nodes.targets.length !== 0)
			survey.targets = nodes.targets;

		return survey;
	}
};