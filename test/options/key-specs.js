import glanceJSON from '../../src';

describe('Key', () => {
	it('should limit to searching keys', () => {
		glanceJSON({
			subject: 'item 1',
			something: 'subject'
		}, 'subject #key').should.deep.equal('item 1');
	});
});
