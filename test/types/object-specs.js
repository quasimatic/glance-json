import glanceJSON from '../../src/index';

describe('Object', () => {
	it('should return item if blank reference', () => {
		glanceJSON({
			key1: 'value1'
		}, '').should.deep.equal({
			key1: 'value1'
		});
	});

	it('should get the value by default', () => {
		glanceJSON({
			key1: 'value1'
		}, 'key1').should.deep.equal('value1');
	});

	it('should get object from key contains', function() {
		glanceJSON({
			item1: 'value1'
		}, 'item #contains-text').should.deep.equal('value1');
	});

	it('should not find a key using exact', function() {
		expect(() => glanceJSON({
			subject1: 'value1'
		}, 'subject #exact-text')).to.throw("Nothing found");
	});

	it('should find a key using exact', function() {
		glanceJSON({
			key1: 'value1'
		}, 'key1 #exact-text').should.deep.equal('value1');
	});

	it('should not find a key using exact case sensitive', function() {
		expect(() => glanceJSON({
			KEY1: 'value1'
		}, 'key1 #exact-text #case-sensitive')).to.throw('Nothing found');
	});

	it('should find a key using exact case sensitive', function() {
		glanceJSON({
			KEY1: 'value1'
		}, 'KEY1 #exact-text #case-sensitive').should.deep.equal('value1');
	});

	it('should return the matched value', () => {
		glanceJSON({
			key1: 'subject1'
		}, 'subject').should.deep.equal('subject1');
	});

	it('should not matchevalue with exact-text', () => {
		expect(() => glanceJSON({
			key1: 'value1'
		}, 'value #exact-text')).to.throw('Nothing found');
	});

	it('should match value with exact-text', () => {
		glanceJSON({
			key1: 'value1'
		}, 'value1 #exact-text').should.deep.equal('value1');
	});

	it('should find key starting with label', () => {
		glanceJSON({'abcdef': '123abc', '123abc456': 'invalid'}, 'abc #starts-with').should.deep.equal('123abc');
	});

	it('should find value starting with label', () => {
		glanceJSON({'abcdef': '123abc', 'aaa123bbb': 'invalid'}, '123 #starts-with').should.deep.equal('123abc');
	});

	it('should find key ending with label', () => {
		glanceJSON({'abcdef': '123abc', '123def456': '444def555'}, 'def #ends-with').should.deep.equal('123abc');
	});

	it('should find value ending with label', () => {
		glanceJSON({'abcdef': '123def', 'aaa123bbb': '444def555'}, 'def #ends-with').should.deep.equal('123def');
	});

	// it('should match value and return object', () => {
	// 	glanceJSON({
	// 		key1: 'value1'
	// 	}, 'value1 > object').should.deep.equal({
	// 		key1: 'value1'
	// 	});
	// });
	//
	// it('should match value and return pair', () => {
	// 	glanceJSON({
	// 		key1: 'value1'
	// 	}, 'value1 > pair').should.deep.equal({
	// 		key: 'key1',
	// 		value: 'value1'
	// 	});
	// });
});