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

	it('should treat immediate child and sibling the same distance', () => {
		glanceJSON({
				container: {
					scope: 'scope 1',
					subject: 'subject 1'
				},

				scope: 'scope 2',
				subject: 'subject 2'
			},
			'container > subject').should.deep.equal(['subject 1', 'subject 2']);
	});

	it('should treat deeper children and siblings the same distance', () => {
		glanceJSON({
				container: {
					scope: 'scope 1',
					item: 'subject 1'
				},

				scope: 'scope 2',
				item: 'subject 2'
			},
			'container > subject').should.deep.equal(['subject 1', 'subject 2']);
	});

	it('should pick a closer sibling than grandchild', () => {
		glanceJSON({
				container: {
					outerscope: {
						scope: 'scope 1',
						subject: 'subject 1'
					}
				},

				scope: 'scope 2',
				subject: 'subject 2'
			},
			'container > subject').should.deep.equal('subject 2');
	});

	it('should pick a closer sibling than a deeper grandchild', () => {
		glanceJSON({
				container: {
					outerscope: {
						outerscope2: {
							scope: 'scope 1',
							subject: 'subject 1'
						}
					}
				},

				scope: 'scope 2',
				subject: 'subject 2'
			},
			'container > subject').should.deep.equal('subject 2');
	});

	it('should pick the closest child and sibling', () => {
		glanceJSON({
				container: {
					scope: 'scope 1',
					subject: 'subject 1',
					more: {
						subject: 'subject 2'
					}
				},

				scope: 'scope 2',
				subject: 'subject 3'
			},
			'container > subject').should.deep.equal(['subject 1', 'subject 3']);
	});

	it('should narrow down to the scope with the closest ancester another example', () => {
		glanceJSON({
			subjectRoot: [
				{
					subject: {
						data: 'item 1',
					},
					foobar: {
						data: 'item 2'
					}
				},
			]
		}, 'subject > data').should.deep.equal('item 1');
	});

	it('should narrow down to all targets with the closest ancestor scope', () => {
		glanceJSON({
				container: {
					scope: 'scope 1',
					foobar: 'subject 1',
					another: 'subject 2',
					more: {
						aaa: 'subject 3'
					}
				},

				scope: 'scope 2',
				item: 'subject 4'
			},
			'container > subject').should.deep.equal(['subject 1', 'subject 2', 'subject 4']);
	});

	it('should not find the same scope as a subject', () => {
		glanceJSON({
			'container item': {
				item: 'subject'
			}
		}, 'container > item').should.equal('subject');
	});

	it('should get the first matching container then the subject', () => {
		glanceJSON({
			item: {
				item: 'bad 1',
				subject: 'good'
			},
			something: {
				item: 'bad 2',
				subject: 'bad'
			}
		}, 'item #first > item > subject').should.equal('good');
	});

	it('should get the all matching near a scope even if in a container', () => {
		glanceJSON({
			item: {
				item: 'bad 1',
				subject: 'good 1'
			},
			something: {
				item: 'bad 2',
				subject: 'good 2'
			}
		}, 'item > subject').should.deep.equal(['good 1', 'good 2']);
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
		}, 'container2 > scope 1 > subject').should.deep.equal(['subject 1', 'subject 1.2']);
	});

	it('should not find matches if scope does not match', () => {
		expect(() => glanceJSON({
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
		}, 'missing > scope 1 > subject')).to.throw('Nothing found');
	});
})
;