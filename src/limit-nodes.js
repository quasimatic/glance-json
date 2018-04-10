import filter from '@arr/filter';

function distance({subjectAncestorLength, scopeAncestorLength, parentIndex}) {
	return ((subjectAncestorLength - parentIndex) + (scopeAncestorLength - parentIndex));
}

function matchingParentIndex(scope, subject, max) {
	for (let i = 0; i <= max; ++i) {
		if(scope.ancestors[i] !== subject.ancestors[i])
			return i - 1;
	}
}

function ancestorLength(node) {
	return node.ancestors.length;
}

export function limitNodes(survey) {
	let shortest = {
		ancestorLength: null,
		length: null,
		nodes: [],
		containers: []
	};

	let filteredResults = new Set(survey.targets);
	let filteredScopes = new Set(survey.scopes);

	for (let parentIndex = 0; ; ++parentIndex) {
		if(filteredScopes.size === 0 || filteredResults.size === 0)
			break;

		let nextRoundSubjects = new Set();
		let nextRoundScopes = new Set();

		for (let subject of filteredResults) {
			let subjectAncestorLength = ancestorLength(subject) + 1;

			if(subjectAncestorLength === parentIndex)
				continue;

			let subParent = subject.ancestors[parentIndex];

			for (let scope of filteredScopes) {
				let scopeAncestorLength = ancestorLength(scope) + 1;

				if(scopeAncestorLength === parentIndex)
					continue;

				let scopeParent = scope.ancestors[parentIndex];

				let scopeIsContainerOffset = 0;
				let ancestorDistance = 0;
				if(subject.ancestors.indexOf(scope) !== -1) {
					scopeIsContainerOffset = ancestorLength(subject) - subject.ancestors.indexOf(scope);
					ancestorDistance = subject.ancestors.indexOf(scope);
				}

				if(subParent !== scopeParent) {
					let matchingAncestorIndex = matchingParentIndex(scope, subject, parentIndex);
					let matchingAncestor = subject.ancestors[matchingAncestorIndex];

					if(scopeIsContainerOffset || shortest.ancestorLength) {
						if(scopeIsContainerOffset === 0)
							continue;

						if(shortest.ancestorLength === null) {
							shortest.nodes = [subject];
							shortest.containers = [matchingAncestor];
							shortest.ancestorLength = scopeIsContainerOffset;
						}
						else if(shortest.ancestorLength === scopeIsContainerOffset) {
							shortest.nodes.push(subject);
							shortest.containers.push(matchingAncestor);
						}
						else if(scopeIsContainerOffset < shortest.ancestorLength) {
							shortest.nodes = [subject];
							shortest.containers = [matchingAncestor];
							shortest.ancestorLength = scopeIsContainerOffset;
						}
					}
					else {
						let dist = distance({
							subjectAncestorLength,
							scopeAncestorLength,
							parentIndex: matchingAncestorIndex,
							scopeIsContainerOffset
						});
						if(shortest.length || shortest.length === 0) {
							if(dist < shortest.length) {
								shortest.nodes = [subject];
								shortest.containers = [matchingAncestor];
								shortest.length = dist;
							}
							else if(dist === shortest.length) {
								shortest.nodes.push(subject);
								shortest.containers.push(matchingAncestor);
							}
						}
						else {
							shortest.nodes.push(subject);
							shortest.containers.push(matchingAncestor);
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

	if(shortest.nodes.length !== 0)
		return {
			targets: filter(survey.targets, t => shortest.nodes.indexOf(t) !== -1),
			containers: shortest.containers
		};

	else
		return {
			targets: survey.targets,
			containers: []
		};
}