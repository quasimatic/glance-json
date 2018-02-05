import glanceJSON from '../src/index';

describe('Types', () => {
	it('should return value by default', () => {
		glanceJSON({subject: 5}, 'subject').should.equal(5);
	});

	it('should return the pair as a subject', () => {
		glanceJSON({subject: 5}, 'subject > pair').should.deep.equal({key: 'subject', value: 5});
	});

	it('should return the object as a subject', () => {
		glanceJSON({subject: 5}, 'subject > object').should.deep.equal({subject: 5});
	});

	it('should return the key', function() {
		glanceJSON({subject: 5}, 'subject > key').should.deep.equal('subject');
	});
});