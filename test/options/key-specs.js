import glanceJSON from '../../src/index'

describe('Key', () => {
    it('should only search keys', () => {
        glanceJSON({
			subject: {
				data1: "subject",
				data2: "subject"
			}
		}, "subject#key").should.deep.equal({data1: "subject", data2: 'subject'})
    });

    it('should work on scopes', () =>{
		glanceJSON({
			scope: {
				container: {
					name: "scope",
					data: "subject"
				}
			},
			container: {
				name: "scope",
				subject: "bad subject"
			}
		}, "scope#key > subject").should.deep.equal('subject')
	});
})