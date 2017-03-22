require('./defiant');
import parser from 'glance-parser';
import extensions from './locators';

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

		let subjectParentDistance = {};
		let closestDistance = -1;
		let filteredResults = [];
		subjectResults.forEach(d => {
			let parent = d.xml;
			let distance = 0;

			while (parent) {
				if (scopeResult.parentDistance[parent]) {
					if (closestDistance === -1 || scopeResult.parentDistance[parent] + distance <= closestDistance) {
						if (scopeResult.parentDistance[parent] + distance < closestDistance)
							filteredResults.length = 0;

						closestDistance = scopeResult.parentDistance[parent] + distance;
						filteredResults.push(d);
						return true;
					}
					else {
						return false;
					}
				}

				if (!subjectParentDistance[parent] || distance < subjectParentDistance[parent]) subjectParentDistance[parent] = distance;
				parent = parent.parentNode;
				++distance;
			}

			if (scopeResult.scopeResults.length === 0) {
				filteredResults.push(d);
				return true;
			}

			return false;
		});

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
