import glanceJSON from '../../src';

describe('Value', () => {
	it('should limit to searching values', () => {
		glanceJSON({
			subject: 'item 1',
			something: 'subject'
		}, 'subject #value').should.deep.equal('subject');
	});
});
