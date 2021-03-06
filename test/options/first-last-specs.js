import glanceJSON from '../../src/index';

describe('First', () => {
	it('should get the first item of a match', () => {
		glanceJSON([1, 2, 3, 4, 5], 'number #first').should.deep.equal(1);
	});

	it('should throw error for no matches', () => {
		expect(() => glanceJSON([], 'number #first')).to.throw('Cannot get first item, no items found');
	});
});

describe('last', () => {
	it('should get the lst item of a match', () => {
		glanceJSON([1, 2, 3, 4, 5], 'number #last').should.deep.equal(5);
	});

	it('should throw error for no matches', () => {
		expect(() => glanceJSON([], 'number #last')).to.throw('Cannot get last item, no items found');
	});

	it('should get the last match of multiple pairs', () => {
		let item1 = function() {
		};

		glanceJSON({
			container1: {
				item1: item1,
			},
			container2: {
				item2: function item() {
				},
			},

			container3: ['item']
		}, 'container1 > item #last').should.deep.equal(item1);
	});
});
