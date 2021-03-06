import glanceJSON from '../src/index';

describe('Types: scope', () => {
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
		glanceJSON({subject: [1, 2, 3, 4, 5]}, '5 > object').should.deep.equal({subject: [1, 2, 3, 4, 5]});
	});

	it('should return the key', function() {
		glanceJSON({subject: 5}, 'subject > key').should.deep.equal('subject');
	});

	it('should return the key for a value', function() {
		glanceJSON({subject: 5}, '5 > key').should.deep.equal('subject');
	});

	it('should return the key of a deeper value', function() {
		glanceJSON({subject: [1, 2, 3, 4, 5]}, '5 > key').should.deep.equal('subject');
	});

	it('should return the value', function() {
		glanceJSON({subject: 'hello world'}, 'hello > value').should.deep.equal('hello world');
	});

	it('should return the array', function() {
		glanceJSON([1, 2, 3], '2 > array').should.deep.equal([1, 2, 3]);
	});

	it('should return a string', function() {
		glanceJSON({subject: 5, subject2: '5'}, '5 > string').should.deep.equal('5');
	});

	it('should return a number', function() {
		glanceJSON({subject: 5, subject2: '5'}, '5 > number').should.deep.equal(5);
	});

	it('should return a boolean', function() {
		glanceJSON({subject: true, subject2: 'true'}, 'true > boolean').should.deep.equal(true);
	});

	it('should return a function', function() {
		let func = function() {
		};
		glanceJSON({subject: func, subject2: 'function(){}'}, 'subject > function').should.equal(func);
	});

	it('should return a function with explict type option', function() {
		let func1 = function() {
		};
		let func2 = function() {
		};

		glanceJSON([
			{subject: func1, subject2: 'function(){}'},
			{subject3: func2, subject4: 'function(){}'}
		], 'subject3 > function #type').should.deep.equal(func2);
	});

	it('should find the object of a value', function() {
		glanceJSON({
			container: {
				subject: 5,
			}
		}, '5 > object').should.deep.equal({
			subject: 5,
		});
	});

	it('should find the object closest to value', function() {
		glanceJSON({
			container: {
				subject: {a: 5},
				data: [1, 2, 3, 4, 5]
			}
		}, '5 > object').should.deep.equal({
			a: 5,
		});
	});
});

describe('Types: intersect', () => {
	it('should match a string', function() {
		glanceJSON({subject: 5, subject2: '5'}, '5 ^ string').should.deep.equal('5');
	});

	it('should match a number', function() {
		glanceJSON({subject: 5, subject2: '5'}, '5 ^ number').should.deep.equal(5);
	});

	it('should match a boolean', function() {
		glanceJSON({subject: true, subject2: 'true'}, 'true ^ boolean').should.deep.equal(true);
	});

	it('should match a string with string first', function() {
		glanceJSON({subject: 5, subject2: '5', subject3: '3'}, 'string ^ 5').should.deep.equal('5');
	});

	it('should match a number', function() {
		glanceJSON({subject: 5, subject2: '5', subject3: 3}, 'number ^ 5').should.deep.equal(5);
	});

	it('should match a boolean', function() {
		glanceJSON({subject: true, subject2: 'true', subject3: false}, 'boolean ^ true').should.deep.equal(true);
	});

	it('should return the value', function() {
		glanceJSON({subject: 'hello world'}, 'hello ^ value').should.deep.equal('hello world');
	});

	it('should return a function function', function() {
		let func = function() {
		};
		glanceJSON({subject: func, subject2: 'function(){}'}, 'function').should.equal(func);
	});
});

describe('Property', () => {
	it('should match a string', function() {
		glanceJSON({
			subject: 'this is a string',
			subject2: '5'
		}, 'string #property').should.deep.equal('this is a string');
	});

	it('should return a string and not a function', () => {
		glanceJSON({
			subject: function() {
			}, subject2: 'function(){}'
		}, 'function #property').should.equal('function(){}');
	});

	it('should return a string and not a boolean', () => {
		glanceJSON({subject: 'boolean', subject2: true}, 'boolean #property').should.equal('boolean');
	});
});
