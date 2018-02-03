import reduce from '@arr/reduce';

export default {
	'limit-scope': function({survey}) {
		if(survey.scopes && survey.scopes.length > 0) {
			let shortest = {
				length: null,
				nodes: []
			};

			let filteredResults = new Set(survey.targets);
			let filteredScopes = new Set(survey.scopes);

			for (let parentIndex = 0; ; ++parentIndex) {
				if(filteredScopes.size === 0 || filteredResults.length === 0)
					break;

				let nextRoundSubjects = new Set();
				let nextRoundScopes = new Set();

				for (let subject of filteredResults) {
					let subjectAncestorLength = subject.ancestors.length + 1;

					if(subjectAncestorLength === parentIndex)
						continue;

					let subParent = subject.ancestors[parentIndex];

					for (let scope of filteredScopes) {
						let scopeAncestorLength = scope.ancestors.length + 1;

						if(scopeAncestorLength === parentIndex)
							continue;

						let scopeParent = scope.ancestors[parentIndex];

						let scopeIsContainerOffset = 0;
						if(subject.ancestors.indexOf(scope) !== -1) {
							scopeIsContainerOffset = subject.ancestors.indexOf(scope) + 1;
						}

						if(subParent !== scopeParent) {
							if(shortest.length || shortest.length === 0) {
								if(((subjectAncestorLength + scopeAncestorLength) - (2 * (parentIndex + 1))) - scopeIsContainerOffset < shortest.length) {
									shortest.nodes = [subject];
									shortest.length = ((subjectAncestorLength + scopeAncestorLength) - (2 * (parentIndex + 1))) - scopeIsContainerOffset;
								}
								else if(((subjectAncestorLength + scopeAncestorLength) - (2 * (parentIndex + 1))) - scopeIsContainerOffset === shortest.length) {
									shortest.nodes.push(subject);
								}
							}
							else {
								shortest.nodes.push(subject);
								shortest.length = ((subjectAncestorLength + scopeAncestorLength) - (2 * (parentIndex + 1))) - scopeIsContainerOffset;
							}
						}
						else {
							nextRoundSubjects.add(subject);
							nextRoundScopes.add(scope);
						}
					}
				}

				filteredResults = nextRoundSubjects;
				filteredScopes = nextRoundScopes;
			}

			survey.targets = shortest.nodes;
		}

		return survey;
	}
};