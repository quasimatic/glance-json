import parse from 'glance-parser';
import reduce from '@arr/reduce';
import forEach from '@arr/foreach';
import map from '@arr/map';
import * as options from './options';

RegExp.escape= function(s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

class Survey {
	constructor({data, reference}) {
		this.data = data;
		this.reference = reference;
		this.remainingTargets = parse(reference);
		this.result;
	}
}

class Container {
	constructor() {
		this.keyValuePairNodes = {};
		this.valueNodes = [];
	}
}

function prepData(data, container, parentNode = null) {
	let node = {
		ancestors: parentNode && parentNode.ancestors ? Array.from(parentNode.ancestors) : [],
		parentNode: parentNode,
		value: data,
		type: Object.prototype.toString.call(data) === '[object Array]' ? 'array' : typeof(data)
	};

	if(parentNode)
		node.ancestors.push(parentNode);

	if(typeof(data) === 'object') {
		parentNode = node;

		forEach(Object.keys(data), k => {
			container.keyValuePairNodes[k] = container.keyValuePairNodes[k] || [];

			let node = {
				ancestors: parentNode && parentNode.ancestors ? Array.from(parentNode.ancestors) : [],
				parentNode: parentNode,
				key: k,
				value: {key: k, value: data[k]},
				type: 'pair'
			};

			if(parentNode)
				node.ancestors.push(parentNode);

			if(Object.prototype.toString.call(data) !== '[object Array]')
				container.keyValuePairNodes[k].push(node);

			node.valueNode = prepData(data[k], container, node);
		});
	}
	else {
		container.valueNodes.push(node);
	}

	return node;

	// Prep keys with values
	// Prep Values
	// Prep Arrays
}

function processLocators(survey, target) {
	let results = [];

	results = reduce(Object.values(options), (r, o) => r.concat(o.locate({target, survey})), []);

	if(target.label === 'pair') {
		results = map(survey.scopes, r => r.parentNode);
	}
	else {
		results = results.map(r => {
			if(r.type === 'pair')
				return r.valueNode;

			return r;
		});
	}

	return results;
}

function processTarget(survey, target) {
	let located = processLocators(survey, target);



	// Filter

	// Intersects

	return Array.from(new Set(located));
}

function processIntersects(survey, intersects) {
	let subjectResults = reduce(intersects, (result, target) => {
		survey.intersections = result;
		return processTarget(survey, target);
	}, []);

	if(survey.scopes && survey.scopes.length > 0) {
		let newContainers = new Container();

		let shortest = {
			length: null,
			nodes: []
		};

		let filteredResults = new Set(subjectResults);
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

					//
					// (subjectAncestorLength + scopeAncestorLength) - (2 * (parentIndex + 1)) < shortest.length
					//
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

		return shortest.nodes;
	}

	return subjectResults;
}

function processSurvey(survey) {
	let container = new Container();
	prepData(survey.data, container);
	survey.container = container;

	survey.subjectTarget = survey.remainingTargets[survey.remainingTargets.length - 1];

	let result = reduce(survey.remainingTargets, (scopes, intersects) => {
		if(scopes && scopes.length === 0)
			return [];

		survey.scopes = scopes;

		return processIntersects(survey, intersects);
	}, null);

	result = result.map(r => r.value);

	return result.length === 1 ? result[0] : result;
}

export function glanceJSON(data, reference) {
	if(reference === '')
		return data;

	let survey = new Survey({data, reference});

	return processSurvey(survey);
}

export default glanceJSON;

/*
  exact-text
  contains-text
  case-sensitive
  case-insensitive
  n
  -n
  starts-with
  ends-with

  in-key
  in-value
  in-type
    array
    string
  	number
  	object
  	boolean
*/


