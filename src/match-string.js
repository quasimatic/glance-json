export default function(text, options) {
	if(options.indexOf('starts-with') !== -1)
		return `^${text}`;
	else if(options.indexOf('ends-with') !== -1)
		return `${text}$`;
	else if(options.indexOf('exact-text') !== -1)
		return `^${text}$`;
	else
		return text;
}