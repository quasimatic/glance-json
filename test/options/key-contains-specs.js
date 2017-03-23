import glanceJSON from '../../src/index'

describe('Key contains', () => {
    it('should only search keys', () => {
        glanceJSON({
			subject123: {
				data1: "subject",
				data2: "subject"
			}
		}, "subject#key-contains").should.deep.equal({data1: "subject", data2: 'subject'})
    });

    it('should work on scopes', () =>{
		glanceJSON({
			scope123: {
				container: {
					name: "scope",
					data: "subject"
				}
			},
			container: {
				name: "scope",
				subject: "bad subject"
			}
		}, "scope#key-contains > subject").should.deep.equal('subject')
	});
})