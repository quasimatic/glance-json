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

	it('should return the object of a value', () => {
		glanceJSON({subject: [1,2,3,4,5]}, '5 > object').should.deep.equal({subject: [1,2,3,4,5]});
	});

	it('should return the key', function() {
		glanceJSON({subject: 5}, 'subject > key').should.deep.equal('subject');
	});

	it('should return the key of a deeper value', function() {
		glanceJSON({subject: [1,2,3,4,5]}, '5 > key').should.deep.equal('subject');
	});

	it('should return the array', function() {
		glanceJSON([1,2,3], '2 > array').should.deep.equal([1,2,3]);
	});

	it('should return a string', function() {
		glanceJSON({subject: 5, subject2: "5"}, '5 > string').should.deep.equal("5");
	});

	it('should return a number', function() {
		glanceJSON({subject: 5, subject2: "5"}, '5 > number').should.deep.equal(5);
	});

	it('should return a boolean', function() {
		glanceJSON({subject: true, subject2: "true"}, 'true > boolean').should.deep.equal(true);
	});
});