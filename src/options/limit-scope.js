import filter from '@arr/filter';

function distance({subjectAncestorLength, scopeAncestorLength, parentIndex, scopeIsContainerOffset}) {
	return ((subjectAncestorLength + scopeAncestorLength) - (2 * (parentIndex + 1)));// - scopeIsContainerOffset;
}

export default {
	'limit-scope': function({survey}) {
		if(survey.scopes && survey.scopes.length > 0) {
			let shortest = {
				ancestorLength: null,
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
						let ancestorDistance = 0;
						if(subject.ancestors.indexOf(scope) !== -1) {

							scopeIsContainerOffset = subject.ancestors.length - subject.ancestors.indexOf(scope);
							ancestorDistance = subject.ancestors.indexOf(scope);
						}

						if(subParent !== scopeParent) {
							if(scopeIsContainerOffset || shortest.ancestorLength) {
								if(scopeIsContainerOffset === 0)
									continue;

								if(shortest.ancestorLength === null) {
									shortest.nodes = [subject];
									shortest.ancestorLength = scopeIsContainerOffset;
								}
								else if(shortest.ancestorLength === scopeIsContainerOffset) {
									shortest.nodes.push(subject);
								}
							}
							else {
								let dist = distance({
									subjectAncestorLength,
									scopeAncestorLength,
									parentIndex,
									scopeIsContainerOffset
								});
								if(shortest.length || shortest.length === 0) {
									if(dist < shortest.length) {
										shortest.nodes = [subject];
										shortest.length = dist;
									}
									else if(dist === shortest.length) {
										shortest.nodes.push(subject);
									}
								}
								else {
									shortest.nodes.push(subject);
									shortest.length = dist;
								}
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

			if(shortest.nodes.length !== 0) {
				survey.targets = filter(survey.targets, t => shortest.nodes.indexOf(t) !== -1);
			}
		}

		return survey;
	}
};