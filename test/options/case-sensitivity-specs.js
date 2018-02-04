import glanceJSON from '../../src/index';

describe('Case Sensitivity', () => {
	it('should match case sensitive and exact', () => {
		glanceJSON(['subject', 'subJECT'], 'subJECT #exact #case-sensitive').should.deep.equal('subJECT');
	});

	it('should match case insensitive by default with exact', function() {
		glanceJSON(['subject', 'subJECT'], 'subJECT #exact').should.deep.equal(['subject', 'subJECT']);
	});

	it('should match case insensitive with exact', function() {
		glanceJSON(['subject', 'subJECT'], 'subJECT #exact #case-insensitive').should.deep.equal(['subject', 'subJECT']);
	});
});
