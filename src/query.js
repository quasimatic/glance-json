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
				ret.unshift({json: xres[i].nodeValue, xml: xres[i]});
				break;
			default:
				mapIndex = +xres[i].getAttribute('d:mi');
				ret.unshift({json: map[mapIndex - 1], xml: xres[i]});
		}
	}

	// if environment = development, add search tracing
	if (Defiant.env === 'development') {
		JSON.trace = JSON.mtrace(src, ret, xres);
	}

	return ret;
}

export {jsonSearch};
