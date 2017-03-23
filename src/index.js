require('./defiant');
import parser from 'glance-parser';
import extensions from './options';
import shortestPath from './shortest-path';

let {options} = extensions;

function locate(query) {
	let result = [];

	if (query.options.length == 0) {
		result = result.concat(options['key'](query));
		result = result.concat(options['value'](query));
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

	return result.reduce((result, r) => {
		let lookup = {};
		result.forEach(r => lookup[r.xml] = true);
		let exists = lookup[r.xml];
		return exists ? result : result.concat(r);
	}, []);
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
