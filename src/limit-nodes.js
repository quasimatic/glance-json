import filter from '@arr/filter';

function distance({subjectAncestorLength, scopeAncestorLength, matchingAncestorIndex}) {
	return ((subjectAncestorLength - matchingAncestorIndex) + (scopeAncestorLength - matchingAncestorIndex));
}

function getMatchingAncestorIndex(scope, subject) {
	let max = Math.min(scope.ancestors.length, subject.ancestors.length);
	let lastMatching = -1;
	for (let i = 0; i < max && scope.ancestors[i] === subject.ancestors[i]; ++i) {
		lastMatching = i;
	}

	return lastMatching;
}

export function limitNodes(survey) {
	let shortestMatches = {
		ancestorLength: null,
		length: null,
		nodes: [],
		containers: []
	};

	let matchedSubjects = new Set([].concat(survey.targets));
	let matchedScopes = new Set(survey.scopes);

	for (let subject of matchedSubjects) {
		let subjectAncestorLength = subject.ancestors.length;

		for (let scope of matchedScopes) {
			if(subject === scope)
				continue;

			let scopeAncestorLength = scope.ancestors.length;

			let scopeAncestorOffset = 0;
			let ancestorDistance = 0;

			let scopeIsAncestor = subject.ancestors.indexOf(scope) !== -1;
			if(scopeIsAncestor) {
				scopeAncestorOffset = 2;
				ancestorDistance = subject.ancestors.indexOf(scope);
			}

			let matchingAncestorIndex = getMatchingAncestorIndex(scope, subject);
			let matchingAncestor = subject.ancestors[matchingAncestorIndex];

			let dist = distance({
				subjectAncestorLength,
				scopeAncestorLength,
				matchingAncestorIndex
			}) - scopeAncestorOffset;

			if(!shortestMatches.length || dist < shortestMatches.length) {
				shortestMatches.nodes = [subject];
				shortestMatches.containers = [matchingAncestor];
				shortestMatches.length = dist;
			}
			else if(dist === shortestMatches.length) {
				shortestMatches.nodes.push(subject);
				shortestMatches.containers.push(matchingAncestor);
			}
		}
	}

	if(shortestMatches.nodes.length !== 0) {
		return {
			// Return nodes in correct order
			targets: filter(survey.targets, t => shortestMatches.nodes.indexOf(t) !== -1),
			containers: shortestMatches.containers
		};
	}

	else
		return {
			targets: survey.targets,
			containers: []
		};
}