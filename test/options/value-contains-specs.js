import glanceJSON from '../../src/index'

describe('Value', () => {
    it('should only search values', () => {
        glanceJSON({
			subject: {
				data1: "subject123",
				data2: "subject456"
			}
		}, "subject#value-contains").should.deep.equal(["subject123", "subject456"])
    });

    it('should work on scopes', () =>{
		glanceJSON({
			scope: {
				container: {
					name: "scope123",
					data: "subject 1"
				}
			},
			container: {
				name: "scope456",
				data: "subject 2"
			}
		}, "scope#value-contains > subject").should.deep.equal(['subject 1', 'subject 2'])

	});
})