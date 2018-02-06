import glanceJSON from '../../src';

describe('Null', () => {
	it('should throw an error if not found', () => {
		expect(() => glanceJSON(null, 'subject')).to.throw('Nothing found');
	});

	it('should find null as data', () => {
		expect(glanceJSON(null, 'null')).to.be.null;
	});

	it('should find null in a value', () => {
		expect(glanceJSON({a: null}, 'null')).to.be.null;
	});

	it('should find null in a value with key', () => {
		expect(glanceJSON({a: null}, 'a')).to.be.null;
	});

	it('should find the pair with null', () => {
		glanceJSON({a: null}, 'a > pair').should.deep.equal({key: 'a', value: null});
	});

	it('should get the key', () => {
		glanceJSON({a: null}, 'null > key').should.deep.equal('a');
	});

	it('should support getting null type', function() {
		expect(glanceJSON({a: null, b: 'null'}, 'null #type')).to.be.null
	});

	it('should support getting null type', function() {
		glanceJSON({a: null, b: 'null'}, 'null #property').should.equal('null')
	});

});