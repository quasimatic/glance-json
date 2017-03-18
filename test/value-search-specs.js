import glanceJSON from '../src/index';

describe('Value search: equals', () => {
	it('should find number', () => {
		glanceJSON({subject: 5}, '5').should.equal(5);
	});

	it('should find string', () => {
	   glanceJSON({subject: "subject text"}, 'subject text').should.equal('subject text')
	});
});