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

	it('should support multiple scopes', () => {
		glanceJSON({
			container: [
				{
					container2: {
						scope: 'scope 1',
						subject: 'subject 1'
					},
					scope: 'scope 1',
					subject: 'subject.1'
				},
				{
					scope: 'scope 2',
					subject: 'subject 2'
				}
			]
		}, 'container2 > scope 1 > subject').should.equal('subject 1');
	});
});