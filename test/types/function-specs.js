import glanceJSON from '../../src/index';

describe('Function', () => {
	it('should traverse properties', () => {
		let func = function() {
		};

		func.a = 1;

		glanceJSON(func, 'a').should.deep.equal(1);
	});
});
