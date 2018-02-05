import filter from '@arr/filter';

export default {
	'type': function({target, survey}) {
		if(target.options.indexOf('property') !== -1)
			return survey;

		if(target.label === 'pair' && survey.scopes && survey.scopes.length > 0) {
			survey.targets = filter(survey.scopes, r => {
				return r.type === 'pair';
			});
		}

		if(['string', 'boolean', 'number'].indexOf(target.label) !== -1) {
			survey.targets = filter(survey.container.valueNodes, r => {
				return r.type === target.label;
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
							if(!matched.length || i === matched.length) {
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

		if(target.label === 'array' && survey.targets.length === 0 && survey.scopes) {
			let matched = {
				nodes: []
			};

			for (let scope of survey.scopes) {
				if(scope.type === 'array') {
					matched.length = 0;
					matched.nodes.push(scope.valueNode);
				}
				else {
					let i = 1;
					for (let ancestor of scope.ancestors.reverse()) {
						if(ancestor.type === 'array') {
							if(!matched.length || i === matched.length) {
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

		if(target.label === 'key' && survey.targets.length === 0 && survey.scopes) {
			let matched = {
				nodes: []
			};

			for (let scope of survey.scopes) {
				if(scope.type === 'pair') {
					matched.length = 0;
					matched.nodes.push(scope.keyNode);
				}
				else {
					let i = 1;
					for (let ancestor of scope.ancestors.reverse()) {
						if(ancestor.type === 'pair' && ancestor.parentNode.type !== 'array') {
							if(!matched.length || i === matched.length) {
								matched.length = i;
								matched.nodes.push(ancestor.keyNode);
							}
							else if(i < matched.length) {
								matched.length = i;
								matched.nodes = [ancestor.keyNode];
							}
						}
						++i;
					}
				}
			}

			survey.targets = matched.nodes;
		}

		if(['string', 'boolean', 'number'].indexOf(target.label) !== -1 && survey.targets.length === 0 && survey.scopes) {
			let nodes = [];

			for (let scope of survey.scopes) {
				if(scope.type === target.label) {
					nodes.push(scope);
				}
			}

			survey.targets = nodes;
		}

		return survey;
	}
};
