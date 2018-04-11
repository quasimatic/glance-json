import glanceJSON from '../src/index';

let data = {
	'users': [
		{
			'screen_name': 'scope',
			'description': 'subject',
			'status': {
				'text': 'scope',
				'entities': {
					'user_mentions': [
						{
							'screen_name': 'scope',
						}
					],
				},
				'retweeted_status': {
					'text': 'scope',
					'entities': {
						'user_mentions': [
							{
								'screen_name': 'scope',
							}
						],
					},
				},
			},
		},
		{
			'description': 'Bad',
			'status': {
				'text': 'scope',
			}
		},
	],
};

describe('Misc', () => {
	it('should match the closest scope and subject', () => {
		glanceJSON(data, 'scope > description').should.deep.equal('subject');
	});

	it('should support glancing http', () => {
	   	glanceJSON(require('http'), 'get #value').should.equal('GET')
	})
});