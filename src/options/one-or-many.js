import forEach from '@arr/foreach';

let o = {
	'one-or-many': function({target, survey}) {
		if(target.options.indexOf('many') !== -1) {
			return o['many']({target, survey});
		}
		else {
			if(!survey.targets || (Object.prototype.toString.call(survey.targets) === '[object Array]' && survey.targets.length === 0))
				throw new Error('Nothing found');

			if(Object.prototype.toString.call(survey.targets) === '[object Array]' && survey.targets.length === 1)
				survey.targets = survey.targets[0];
		}

		return survey;
	},
	'single': function({target, survey}) {
		if(survey.targets.length === 0)
			throw new Error('Nothing found');

		if(Object.prototype.toString.call(survey.targets) === '[object Array]' && survey.targets.length > 1) {
			let msg = 'Found more than one. Please narrow down the selection or use #many\n\n';
			forEach(survey.targets, t => msg += JSON.stringify(t.value) + '\n\n');
			throw new Error(msg);
		}

		return survey;
	},
	'many': function({target, survey}) {
		return survey;
	}
};

export default o;