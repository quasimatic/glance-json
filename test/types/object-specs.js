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
			key1: 'value1'
		}, 'key #contains-text').should.deep.equal('value1');
	});

	it('should not find a key using exact', function() {
		glanceJSON({
			key1: 'value1'
		}, 'key #exact-text').should.deep.equal([]);
	});

	it('should find a key using exact', function() {
		glanceJSON({
			key1: 'value1'
		}, 'key1 #exact-text').should.deep.equal('value1');
	});

	it('should not find a key using exact case sensitive', function() {
		glanceJSON({
			KEY1: 'value1'
		}, 'key1 #exact-text #case-sensitive').should.deep.equal([]);
	});

	it('should find a key using exact case sensitive', function() {
		glanceJSON({
			KEY1: 'value1'
		}, 'KEY1 #exact-text #case-sensitive').should.deep.equal('value1');
	});

	it('should return the matched value', () => {
		glanceJSON({
			key1: 'value1'
		}, 'value').should.deep.equal('value1');
	});

	it('should not matchevalue with exact-text', () => {
		glanceJSON({
			key1: 'value1'
		}, 'value #exact-text').should.deep.equal([]);
	});

	it('should match value with exact-text', () => {
		glanceJSON({
			key1: 'value1'
		}, 'value1 #exact-text').should.deep.equal('value1');
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