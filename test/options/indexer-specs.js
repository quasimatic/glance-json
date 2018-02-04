import glanceJSON from '../../src/index';

describe('Indexer', () => {
	it('should return the nth item', () => {
		glanceJSON(['a1', 'a2', 'a3', 'a4', 'a5'], 'a #2').should.deep.equal('a2');
	});

	it('should return the nth item starting from the end', function() {
		glanceJSON(['a1', 'a2', 'a3', 'a4', 'a5'], 'a #-2').should.deep.equal('a4');
	});

	it('should throw an out of range error', () => {
		expect(() => glanceJSON(['a1', 'a2', 'a3', 'a4', 'a5'], 'a #7')).to.throw('Position 7 is out of range there was only 5 found');
	});

	it('should throw an out of range error starting from the end', () => {
		expect(() => glanceJSON(['a1', 'a2', 'a3', 'a4', 'a5'], 'a #-7')).to.throw('Position -7 is out of range there was only 5 found');
	});

	it('should throw an error for 0', () => {
		expect(() => glanceJSON(['a1', 'a2', 'a3', 'a4', 'a5'], 'a #0')).to.throw('Position 0 not supported please start with 1 or -1');
	});
});
