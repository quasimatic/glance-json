require('./defiant');
import parser from 'glance-parser';
import extensions from './options';
import shortestPath from './shortest-path';
import {jsonSearch} from './query';

let {options} = extensions;

function queries(query) {
	let result = [];

	if (query.options.length === 0) {
		result = result.concat(options['key-contains'](query));
		result = result.concat(options['value-contains'](query));
	}
	else {
		if (query.options.indexOf('key') !== -1) {
			result = result.concat(options['key'](query));
		}

		if (query.options.indexOf('value') !== -1) {
			result = result.concat(options['value'](query));
		}

		if (query.options.indexOf('key-contains') !== -1) {
			result = result.concat(options['key-contains'](query));
		}

		if (query.options.indexOf('value-contains') !== -1) {
			result = result.concat(options['value-contains'](query));
		}
	}

	return `(${result.join(" or ")})`;
}

let processScopes = (json, scopes) => {
	return scopes.reduce((scopeResult, targets) => {
		let subjectResults = targetIntersections(json, targets);

		if(scopeResult.scopeResults === null || scopeResult.scopeResults.length !== 0) {
			let {subjectParentDistance, filteredResults} = shortestPath(subjectResults, scopeResult.scopeResults || [], scopeResult.parentDistance);
			return {scopeResults: filteredResults, parentDistance: subjectParentDistance};
		}

		return {scopeResults: [], parentDistance: {}};
	}, {scopeResults: null, parentDistance: {}}).scopeResults;
};

let targetIntersections = (json, targets) => {
	let q = targets.map(target => queries({...target, json})).join(" and ");
	return jsonSearch(json, `//*[${q} and not(*[${q}])]`);
};

function CreateGlanceJSON() {
	this.selector = (json, reference) => {
		let scopeTargets = parser.parse(reference);

		let result = processScopes(json, scopeTargets);
		let jsonResult = result.map(r => r.json);
		return jsonResult.length === 1 ? jsonResult[0] : jsonResult;
	};

	return this.selector;
}

export default new CreateGlanceJSON();
