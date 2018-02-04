import parse from 'glance-parser';
import reduce from '@arr/reduce';
import forEach from '@arr/foreach';
import options from './options';

let defaultOptions = ['key', 'value', 'value-or-pair-type', 'intersect', 'limit-scope'];

class Survey {
	constructor({data, reference}) {
		this.data = data;
		this.reference = reference;
		this.remainingTargets = parse(reference);
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
	return reduce(intersects, (result, target) => {
		result.subjects = result.targets;
		result.targets = [];

		let execute = null;
		result = reduce([].concat(defaultOptions, target.options), (r, option) => {
			if(typeof(options[option]) === 'function')
				execute = options[option];
			else {
				let dynamicOption = options[Object.keys(options).find(k => options[k].check ? options[k].check({option}) : false)];
				if(dynamicOption) {
					execute = dynamicOption.execute;
				}
			}

			if(execute)
				return execute({target, option, survey: r});

			return r;
		}, result);

		result.targets = Array.from(new Set(result.targets));
		return result;
	}, survey);
}

function processSurvey(survey) {
	let container = new Container();
	prepData(survey.data, container);
	survey.container = container;

	survey = reduce(survey.remainingTargets, (r, intersects) => {
		if(r.targets) {
			if(r.targets.length === 0)
				return r;

			r.scopes = r.targets;
			r.targets = [];
		}

		return processIntersects(r, intersects);
	}, survey);

	return processSubject({survey});
}

function processSubject({survey}) {
	let result = survey.targets.map(r => r.value);

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
  in-type
    array
    string
  	number
  	object
  	boolean
*/


