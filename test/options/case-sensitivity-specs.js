import glanceJSON from '../../src/index';

describe('Case Sensitivity', () => {
	it('should match case sensitive and exact-text', () => {
		glanceJSON(['subject', 'subJECT'], 'subJECT #exact-text #case-sensitive').should.deep.equal('subJECT');
	});

	it('should match case insensitive by default with exact-text', function() {
		glanceJSON(['subject', 'subJECT'], 'subJECT #exact-text').should.deep.equal(['subject', 'subJECT']);
	});

	it('should match case insensitive with exact-text', function() {
		glanceJSON(['subject', 'subJECT'], 'subJECT #exact-text #case-insensitive').should.deep.equal(['subject', 'subJECT']);
	});

	it('should match case sensitive and contains-text', () => {
		glanceJSON(['subject', 'subJECT'], 'bJEC #contains-text #case-sensitive').should.deep.equal('subJECT');
	});

	it('should match case insensitive by default with contains-text', function() {
		glanceJSON(['subject', 'subJECT'], 'bJEC #contains-text').should.deep.equal(['subject', 'subJECT']);
	});

	it('should match case insensitive with contains-text', function() {
		glanceJSON(['subject', 'subJECT'], 'bJEC #contains-text #case-insensitive').should.deep.equal(['subject', 'subJECT']);
	});
});
