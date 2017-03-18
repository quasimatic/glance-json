require('./defiant');

function jsonSearch(tree, xpath, single) {
	'use strict';

	var isSnapshot = tree.doc && tree.doc.nodeType,
		doc = isSnapshot ? tree.doc : JSON.toXML(tree),
		map = isSnapshot ? tree.map : JSON.search.map,
		src = isSnapshot ? tree.src : tree,
		xres = Defiant.node[single ? 'selectSingleNode' : 'selectNodes'](doc, xpath.xTransform()),
		ret = [],
		mapIndex,
		i;

	if (single) xres = [xres];
	i = xres.length;

	while (i--) {
		switch (xres[i].nodeType) {
			case 2:
			case 3:
				ret.unshift(xres[i].nodeValue);
				break;
			default:
				mapIndex = +xres[i].getAttribute('d:mi');
				ret.unshift(map[mapIndex - 1]);
		}
	}

	// if environment = development, add search tracing
	if (Defiant.env === 'development') {
		this.trace = JSON.mtrace(src, ret, xres);
	}

	return ret;
}

function locate({reference, json}) {
	console.log(jsonSearch(json, `//${reference}`));
	return jsonSearch(json, `//${reference}`);
}

function createGlanceJSON() {
	this.selector = (reference, json) => {
		let result = locate({reference, json});
		return result.length == 1 ? result[0] : result;
	};

	return this.selector;
}

export default new createGlanceJSON();
