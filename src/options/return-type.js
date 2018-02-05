import map from '@arr/map';
import filter from '@arr/filter';

export default {
	'return-type': function({target, survey}) {
		if(target.options.indexOf('property') !== -1)
			return survey;

		if(target.options.indexOf('type') === -1) {
			survey.targets = Array.from(new Set(map(survey.targets, r => {
				if(r.type === 'pair')
					return r.valueNode;

				return r;
			})));
		}

		if(target.label === 'pair') {
			survey.targets = filter(survey.scopes, r => {
				return r.type === 'pair';
			});
		}

		if(target.label === 'object') {
			let matched = {
				nodes: []
			};

			for (let scope of survey.scopes) {
				if(scope.type === 'object') {
					matched.length = 0;
					matched.nodes.push(scope);
				}
				else {
					let i = 1;
					for (let ancestor of scope.ancestors.reverse()) {
						if(ancestor.type === 'object') {
							if(!matched.length || length === matched.length) {
								matched.length = i;
								matched.nodes.push(ancestor);
							}
							else if(i < matched.length) {
								matched.length = i;
								matched.nodes = [ancestor];
							}
						}
						++i;
					}
				}
			}

			survey.targets = matched.nodes;
		}

		return survey;
	}
};