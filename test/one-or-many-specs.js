import glanceJSON from '../src/index';

describe('Single', () => {
	it('should throw error if no item found', () => {
		expect(() => glanceJSON({a: 1}, 'b #single')).to.throw('Nothing found');
	});

	it('should find a single item', () => {
		glanceJSON({a: 1}, '1 #single').should.deep.equal(1);
	});

	it('should throw an error if more than 1 item is found', () => {
		expect(() => glanceJSON({a: 1, b: 1}, '1 #single')).to.throw(`Found more than one. Please narrow down the selection or use #many

1

1

`);
	});
});

describe('Many', () => {
	it('should return an empty array when no items found', () => {
		glanceJSON({a: 1}, 'b #many').should.deep.equal([]);
	});

	it('should return an array with a single item', () => {
		glanceJSON({a: 1}, '1 #many').should.deep.equal([1]);
	});

	it('should return an array with more than one item', () => {
		glanceJSON({a: 1, b: 1}, '1 #many').should.deep.equal([1, 1]);
	});
});

describe('One Or Many', () => {
	it('should return an empty array when no items found', () => {
		expect(() => glanceJSON({a: 1}, 'b #one-or-many')).to.throw('Nothing found');
	});

	it('should return a single item', () => {
		glanceJSON({a: 1}, '1 #one-or-many').should.deep.equal(1);
	});

	it('should return an array with more than one item', () => {
		glanceJSON({a: 1, b: 1}, '1 #one-or-many').should.deep.equal([1, 1]);
	});
});