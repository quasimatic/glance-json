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

	it('should find multiple intersecting values', () => {
		glanceJSON({
			key1: 'duplicate value 1',
			key2: 'duplicate value 1'
		}, 'duplicate ^ value').should.deep.equal(['duplicate value 1', 'duplicate value 1']);
	});

	it('should find the matching object if intersecting two properties', () => {
		glanceJSON({
			item1: {
				key1: 'value1'
			},
			item2: {
				key1: 'value1'
			}
		}, 'key1 ^ value1').should.deep.equal([
			{
				key1: 'value1'
			},
			{
				key1: 'value1'
			}
		]);
	});

	it('should find multiple lower than root', () => {
		glanceJSON({
			level1: {
				item1: {
					key1: 'value1'
				}
			},
			level2: {
				item1: {
					key1: 'value1'
				}
			}
		}, 'key1 ^ value1').should.deep.equal([
			{
				key1: 'value1'
			},
			{
				key1: 'value1'
			}
		]);
	});

	it('should find the closest matching properties', () => {
		glanceJSON({
			level1: {
				item1: {
					key1: 'NA',
					key2: 'value1'
				}
			},
			level2: {
				item1: {
					key1: 'NA',
					level3: {
						key2: 'value1'
					}
				}
			}
		}, 'key1 ^ value1').should.deep.equal({
			key1: 'NA',
			key2: 'value1'
		});
	});

	it('should pick one of multiple', () => {
		glanceJSON({
			level1: {
				item1: {
					key1: 'value1'
				}
			},
			level2: {
				item1: {
					key1: 'value1'
				}
			}
		}, 'key1 ^ value1 #2').should.deep.equal({
			key1: 'value1'
		});
	});
});