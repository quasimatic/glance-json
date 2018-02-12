import forEach from '@arr/foreach';

let o = {
	'one-or-many': function({target, survey}) {
		let things;
		if(survey.subjects && survey.subjects.length > 0)
			things = survey.subjects;
		else
			things = survey.targets;

		if(target.options.indexOf('many') !== -1) {
			return o['many']({target, survey});
		}
		else {
			if(!things || (Object.prototype.toString.call(things) === '[object Array]' && things.length === 0))
				throw new Error('Nothing found');

			if(Object.prototype.toString.call(things) === '[object Array]' && things.length === 1) {
				if(survey.subjects)
					survey.subjects = things[0];
				else
					survey.targets = things[0];
			}
		}

		return survey;
	},
	'single': function({target, survey}) {
		let things;

		if(survey.subjects && survey.subjects.length > 0)
			things = survey.subjects;
		else
			things = survey.targets;

		if(things.length === 0)
			throw new Error('Nothing found');

		if(Object.prototype.toString.call(things) === '[object Array]' && things.length > 1) {
			let msg = 'Found more than one. Please narrow down the selection or use #many\n\n';
			forEach(things, t => msg += JSON.stringify(t.value) + '\n\n');
			throw new Error(msg);
		}

		return survey;
	},
	'many': function({target, survey}) {
		return survey;
	}
};

export default o;