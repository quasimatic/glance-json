import glanceJSON from '../src/index';

describe('Subject: single', () => {
	it('should get number', () => {
		glanceJSON({subject: 5}, 'subject').should.equal(5);
	});

	it('should get string', () => {
		glanceJSON({subject: 'subject-value'}, 'subject').should.equal('subject-value');
	});

	it('should get array', () => {
		glanceJSON({subject: [1, 2, 3]}, 'subject').should.deep.equal([1, 2, 3]);
	});

	it('should get array for a single value array', () => {
		glanceJSON({subject: [1]}, 'subject').should.deep.equal([1]);
	});

	it('should get an object', () => {
		glanceJSON({subject: {a: 1, b: 2}}, 'subject').should.deep.equal({a: 1, b: 2});
	});

	it('should find many items by default', () => {
		glanceJSON({subject: {a: "1", b: "12"}}, '1').should.deep.equal(["1", "12"]);
	});
});

describe('Subject: multiple', () => {
	it('should get numbers', () => {
		glanceJSON({subject: 5, container: {subject: 6}}, 'subject').should.deep.equal([5, 6]);
	});

	it('should get strings', () => {
		glanceJSON({
			subject: 'subject-value-1',
			container: {subject: 'subject-value-2'}
		}, 'subject').should.deep.equal(['subject-value-1', 'subject-value-2']);
	});

	it('should get arrays', () => {
		glanceJSON({
			subject: [1, 2, 3],
			container: {subject: [5, 6, 7]}
		}, 'subject').should.deep.equal([[1, 2, 3], [5, 6, 7]]);
	});

	it('should get objects', () => {
		glanceJSON({
			subject: {a: 1, b: 2},
			container: {
				subject: {c: 3, d: 4}
			}
		}, 'subject').should.deep.equal([
			{
				a: 1,
				b: 2
			},
			{
				c: 3,
				d: 4
			}
		]);
	});

	it('should get mixed', () => {
		glanceJSON({
			subject: 1,
			container: {
				subject: {a: 1, c: 2}
			},
			container2: {
				subject: [1, 2, 3]
			},
			container3: {
				subject: [1, {d: 3, e: 4}, [1]]
			}
		}, 'subject').should.deep.equal([1, {a: 1, c: 2}, [1, 2, 3], [1, {d: 3, e: 4}, [1]]]);
	});
});

