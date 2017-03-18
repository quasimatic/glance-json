import glanceJSON from '../src/index';

describe('Subject', () => {
	it('should get number', () => {
		glanceJSON('subject', {subject: 5}).should.equal(5);
	});

	it('should get string', () => {
		glanceJSON('subject', {subject: 'subject-value'}).should.equal('subject-value');
	});

	it('should get array', () => {
		glanceJSON('subject', {subject: [1, 2, 3]}).should.deep.equal([1, 2, 3]);
	});

	it('should get an object', () => {
		glanceJSON('subject', {subject: {a: 1, b: 2}}).should.deep.equal({a: 1, b: 2});
	});
});


