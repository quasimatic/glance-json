import glanceJSON from '../src/index';

describe('Intersections', () => {
	it('should intersect a property', () => {
		glanceJSON({
			container: {
				firstname: 'subject',
				lastname: 'bad subject'
			}
		}, 'name ^ first').should.equal('subject');
	});

	it('should intersect an object', () => {
		glanceJSON({
			people: [
				{
					id: 'bad',
					firstname: 'firstname',
					lastname: 'lastname'
				},
				{
					id: 'subject',
					firstname: 'firstname',
					lastname: 'unique lastname'
				}
			]
		}, 'firstname ^ unique > id').should.equal('subject');
	});

	it('should intersect an array for values', () => {
		glanceJSON({
			people: [
				{
					id: 'object 1',
					firstname: 'firstname',
					lastname: 'lastname'
				},
				{
					id: 'object 2',
					firstname: 'firstname',
					lastname: 'unique lastname'
				}
			]
		}, 'object 1 ^ object 2').should.deep.equal([
				{
					id: 'object 1',
					firstname: 'firstname',
					lastname: 'lastname'
				},
				{
					id: 'object 2',
					firstname: 'firstname',
					lastname: 'unique lastname'
				}
			]
		);
	});

	it('should intersect with options', () => {
		glanceJSON({
			people: [
				{
					id: 'invalid',
					firstname: 'firstname',
					lastname: 'lastname'
				},
				{
					id: 'subject',
					firstname: 'firstname',
					lastname: 'unique lastname'
				}
			]
		}, 'firstname #value ^ unique #value > id').should.equal('subject');
	});
});