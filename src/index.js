import reduce from '@arr/reduce';
import filter from '@arr/filter';
import forEach from '@arr/foreach';
import find from '@arr/find';
import options from './options';
import {Survey} from './survey';

let defaultOptions = ['root', 'key', 'value', 'type'];

let subjectOptions = ['return-type', 'one-or-many'];

class Container {
	constructor() {
		this.keyValuePairNodes = Object.create(null);
		this.valueNodes = [];
		this.containerNodes = [];
		this.keyNodes = [];
	}
}

function getType(o) {
	if(o === null)
		return 'null';

	if(Object.prototype.toString.call(o) === '[object Array]')
		return 'array';

	return typeof(o);
}

function prepData(data, container, parentNode = null) {
	let node = {
		ancestors: parentNode && parentNode.ancestors ? Array.from(parentNode.ancestors) : [],
		parentNode: parentNode,
		value: data,
		type: getType(data)
	};

	if(parentNode)
		node.ancestors.push(parentNode);

	if(getType(data) === 'object' || getType(data) === 'array' || getType(data) === 'function') {
		container.containerNodes.push(node);

		forEach(Object.keys(data), k => {
			container.keyValuePairNodes[k] = container.keyValuePairNodes[k] || [];

			let pairNode = {
				ancestors: Array.from(node.ancestors),
				parentNode: node,
				key: k,
				value: {key: k, value: data[k]},
				type: 'pair'
			};

			if(node)
				pairNode.ancestors.push(node);

			pairNode.keyNode = {
				ancestors: Array.from(pairNode.ancestors),
				parentNode: pairNode,
				value: k,
				type: typeof(k)
			};

			pairNode.keyNode.ancestors.push(pairNode);

			if(Object.prototype.toString.call(data) !== '[object Array]') {
				container.keyValuePairNodes[k].push(pairNode);
				container.keyNodes.push(pairNode.keyNode);
			}

			let existingValueNode = find(container.containerNodes, v => data[k] === v.value);

			if(existingValueNode)
				pairNode.valueNode = existingValueNode;
			else
				pairNode.valueNode = prepData(data[k], container, pairNode);
		});
	}
	else {
		container.valueNodes.push(node);
	}

	return node;
}

function prioritizeOptions(targetOptions) {
	function check(option) {
		return options['indexer'].check({option}) || ['last', 'first'].indexOf(option) !== -1
	}

	return [].concat(filter(targetOptions, v => !check(v)), filter(targetOptions, check));
}

function defaultOptionsRemovingDeclared(targetOptions) {
	return defaultOptions.filter(o => targetOptions.indexOf(o) === -1)
}

function processIntersects(survey, intersects) {
	return reduce(intersects, (result, target) => {
		result.subjects = result.targets;
		result.targets = [];

		let execute = null;
		result = reduce(prioritizeOptions([].concat(defaultOptionsRemovingDeclared(target.options), target.options, ['intersect', 'limit-scope'])), (r, option) => {
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

		}, result);

		result.targets = Object.prototype.toString.call(result.targets) === '[object Array]' ? Array.from(new Set(result.targets)) : result.targets;
		return result;
	}, survey);
}

function processSurvey(survey) {
	let container = new Container();
	let root = prepData(survey.data, container);
	survey.container = container;
	survey.container.root = root;

	survey = reduce(survey.remainingTargets, (r, intersects) => {
		if(r.targets) {
			if(r.targets.length === 0)
				return r;

			r.scopes = r.targets;
			r.targets = [];
		}

		return processIntersects(r, intersects);
	}, survey);

	survey.subjects = survey.targets;
	survey.targets = [];

	return processSubject({survey});
}

function processSubject({survey}) {
	let execute = null;
	let result = reduce(subjectOptions, (r, option) => {
		if(typeof(options[option]) === 'function')
			execute = options[option];

		if(execute) {
			let intersects = survey.remainingTargets[survey.remainingTargets.length - 1];
			return execute({target: intersects[intersects.length - 1], survey: r});
		}
	}, survey);

	return Object.prototype.toString.call(result.subjects) === '[object Array]' ? result.subjects.map(r => r.value) : result.subjects.value;
}

export function glanceJSON(data, referenceOrSurvey) {
	let survey;

	if(typeof(referenceOrSurvey) === 'object') {
		if(referenceOrSurvey.remainingTargets.length === 0)
			return data;

		survey = new Survey({data, reference: referenceOrSurvey.reference});
		survey.remainingTargets = referenceOrSurvey.remainingTargets;
	}
	else {
		if(referenceOrSurvey === '')
			return data;

		survey = new Survey({data, reference: referenceOrSurvey});
	}

	return processSurvey(survey);
}

export default glanceJSON;

