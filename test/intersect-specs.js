import glanceJSON from '../src/index';

describe('Intersections', () => {
	it('should intersect results', () => {
		glanceJSON({
			container: {
				firstname: 'subject',
				lastname: 'bad subject'
			}
		}, 'name ^ first').should.equal('subject');
	});
});