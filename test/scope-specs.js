import glanceJSON from '../src/index';

describe('Scope', () => {
	it('should narrow result to scope', () => {
		glanceJSON({
			container: {
				scope: 'scope text',
				subject: 'subject text'
			}
		}, 'scope > subject').should.equal('subject text');
	});

	it('should pick the subject closest to the scope', () => {
		glanceJSON({
			container: {
				scope: 'scope text',
				subject: 'subject text'
			},
			subject: 'another subject'
		}, 'scope > subject').should.equal('subject text');
	});

	it('should pick the closest object in an array', () => {
		glanceJSON({
			container: [
				{
					scope: 'scope 1',
					subject: 'subject 1'
				},
				{
					scope: 'scope 2',
					subject: 'subject 2'
				}
			]
		}, 'scope 2 > subject').should.equal('subject 2');
	});

	it('should pick items with the same distance', () => {
		glanceJSON({
				container: {
					scope: 'scope 1',
					subject: 'subject 1'
				},

				scope: 'scope 2',
				subject: 'subject 2'
			},
			'scope > subject').should.deep.equal(['subject 1', 'subject 2']);
	});

	it('should find the same set if the subject is the same as the previous scope', () => {
		glanceJSON({
			container: [
				{
					container2: {
						scope: 'scope 1',
						subject: 'subject 1'
					},
					scope: 'scope 1',
					subject: 'subject 1.2'
				},
				{
					scope: 'scope 2',
					subject: 'subject 2'
				}
			]
		}, 'container2 > scope 1 > scope 1').should.equal('scope 1');
	});

	it('should support multiple scopes', () => {
		glanceJSON({
			container: [
				{
					container2: {
						scope: 'scope 1',
						subject: 'subject 1'
					},
					scope: 'scope 1',
					subject: 'subject 1.2'
				},
				{
					scope: 'scope 2',
					subject: 'subject 2'
				}
			]
		}, 'container2 > scope 1 > subject').should.equal('subject 1');
	});
});