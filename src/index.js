import parse from 'glance-parser';
import reduce from '@arr/reduce';
import forEach from '@arr/foreach';
import map from '@arr/map';
import options from './options';

let defaultLocatorOptions = reduce(['key', 'value'], (r, k) => {
	r[k] = options[k];
	return r;
}, {});

let defaultScopeOptions = reduce(['limit-scope'], (r, k) => {
	r[k] = options[k];
	return r;
}, {});

let defaultIntersectOptions = reduce(['value-or-pair-type', 'intersect'], (r, k) => {
	r[k] = options[k];
	return r;
}, {});

let defaultOptions = {...defaultLocatorOptions, ...defaultIntersectOptions};

RegExp.escape = function(s) {
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
}

function processIntersects(survey, intersects) {
	survey = reduce(intersects, (result, target) => {
		survey.subjects = result.targets;
		survey.targets = [];
		survey = reduce(Object.keys(defaultOptions), (r, key) => defaultOptions[key]({
			target,
			survey
		}), null);

		survey.targets = Array.from(new Set(survey.targets));
		return survey;
	}, []);

	return reduce(Object.keys(defaultScopeOptions), (r, key) => r.concat(defaultScopeOptions[key]({survey}).targets), []);
}

function processSurvey(survey) {
	let container = new Container();
	prepData(survey.data, container);
	survey.container = container;

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
  n
  -n
  starts-with
  ends-with

  in-type
    array
    string
  	number
  	object
  	boolean
*/


