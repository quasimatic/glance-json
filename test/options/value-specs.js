import glanceJSON from '../../src/index'

describe('Value', () => {
    it('should only search values', () => {
        glanceJSON({
			subject: {
				data1: "subject",
				data2: "subject"
			}
		}, "subject#value").should.deep.equal(["subject", "subject"])
    });

    it('should work on scopes', () =>{
		glanceJSON({
			scope: {
				container: {
					name: "scope",
					data: "subject 1"
				}
			},
			container: {
				name: "scope",
				data: "subject 2"
			}
		}, "scope#value > subject").should.deep.equal(['subject 1', 'subject 2'])
	});
})