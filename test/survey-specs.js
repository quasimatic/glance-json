import glanceJSON from '../src';
import {Survey} from '../src/survey';

describe('Survey', () => {
	it('should take an existing survey', () => {
		let survey = new Survey({reference: "b"});

		glanceJSON({'a': 1, 'b': 2}, survey).should.equal(2);
	});
});