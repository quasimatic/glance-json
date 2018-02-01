import glanceJSON from '../../src/glance2';

describe('Array', () => {
	it('should return item if blank reference', () => {
		glanceJSON([1], '').should.deep.equal([1]);
	});

	it('should find a string', () => {
		glanceJSON(['a', 'b', 'c'], 'b').should.deep.equal('b');
	});

	it('should find a number', () => {
		glanceJSON(['a', 2, 'c'], '2').should.deep.equal(2);
	});

	it('should find a true value boolean', () => {
		glanceJSON(['a', true, 'c'], 'true').should.deep.equal(true);
	});

	it('should find a false value boolean', () => {
		glanceJSON(['a', false, 'c'], 'false').should.deep.equal(false);
	});

	it('should find a partial string', () => {
		glanceJSON(['aaa', 'bbb', 'ccc'], 'a').should.deep.equal('aaa');
	})

	it('should not find a partial string with exact-text', function() {
		glanceJSON(['aaa', 'bbb', 'ccc'], 'a #exact-text').should.deep.equal([]);
	});

	it('should find an exact text match', function() {
		glanceJSON(['aaa', 'bbb', 'ccc'], 'aaa #exact-text').should.deep.equal('aaa');
	});
});
