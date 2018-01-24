import glanceJSON from '../../src/glance2';

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
});