function getUniqueID(node) {
	let path = '';
	let p = node;

	while (p) {
		let i = 0;
		let child = p;
		while ((child = child.previousSibling) !== null) ++i;

		path = `/${i}` + path;

		p = p.parentNode;
	}

	return path;
}

export default function(subjectResults, scopeResults, parentDistance) {
	let subjectParentDistance = {};
	let closestDistance = -1;
	let filteredResults = [];

	subjectResults.forEach(d => {
		let rootPath = getUniqueID(d.xml);
		subjectParentDistance[rootPath] = {};
		let parent = d.xml;
		let distance = 0;

		while (parent) {
			let parentPath = getUniqueID(parent);
			if (parentDistance[parentPath] > -1) {
				let totalDistance = parentDistance[parentPath] + distance;

				if (closestDistance === -1 || totalDistance <= closestDistance) {
					if (totalDistance < closestDistance) {
						filteredResults.length = 0;
					}

					closestDistance = totalDistance;
					filteredResults.push(d);
				}
			}

			subjectParentDistance[rootPath][parentPath] = distance;
			parent = parent.parentNode;
			++distance;
		}

		if (scopeResults.length === 0) {
			filteredResults.push(d);
		}
	});

	subjectParentDistance = filteredResults.reduce((r, f) => ({...r, ...subjectParentDistance[getUniqueID(f.xml)]}), {});

	return {subjectParentDistance, filteredResults};
};