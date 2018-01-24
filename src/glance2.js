import parse from 'glance-parser';
import reduce from '@arr/reduce';

class Survey {
	constructor({data, reference}) {
		this.data = data;
		this.reference = reference;
		this.remainingTargets = parse(reference);
		this.result;
	}
}

function processLocators(survey, target) {

}

function processTarget(survey, target) {
	let located = processLocators(survey, target);
}

function processIntersects(survey, intersects) {
	return reduce(intersects, (result, target) => {
		survey.intersections = result;
		return processTarget(survey, target);
	}, []);
}

function processSurvey(survey) {
	return reduce(survey.remainingTargets, (scopes, intersects) => {
		survey.scopes = scopes;
		return processIntersects(survey, intersects);
	}, []);
}

export function GlanceJSON(data, reference) {
	if (reference === '')
		return data;

	let survey = new Survey({data, reference});

	return processSurvey(survey);
}

export default GlanceJSON;

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


