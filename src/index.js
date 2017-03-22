require('./defiant');
import parser from 'glance-parser';
import extensions from './locators';
import shortestPath from './shortest-path';

let {options} = extensions;

function locate(query) {
	let result = [];
	result = result.concat(options['key'](query));
	result = result.concat(options['value'](query));
	result = result.concat(options['contains-key'](query));
	result = result.concat(options['contains-value'](query));

	return result;
}

let processScopes = (json, scopes) => {
	return scopes.reduce((scopeResult, targets) => {
		let subjectResults = targetIntersections(json, targets);

		let {subjectParentDistance, filteredResults} = shortestPath(subjectResults, scopeResult.scopeResults, scopeResult.parentDistance);

		return {scopeResults: filteredResults, parentDistance: subjectParentDistance};
	}, {scopeResults: [], parentDistance: {}}).scopeResults;
};

let targetIntersections = (json, targets) => {
	return targets.reduce((result, target) => {
		return result.concat(locate({...target, json}));
	}, []);
};

let unique = (array) => ([...new Set(array)]);

function CreateGlanceJSON() {
	this.selector = (json, reference) => {
		let scopeTargets = parser.parse(reference);

		let result = processScopes(json, scopeTargets);
		let jsonResult = unique(result.map(r => r.json));
		return jsonResult.length === 1 ? jsonResult[0] : jsonResult;
	};

	return this.selector;
}

export default new CreateGlanceJSON();
