export default function(subjectResults, scopeResults, parentDistance) {
	let subjectParentDistance = {};
	let closestDistance = -1;
	let filteredResults = [];

	subjectResults.forEach(d => {
		subjectParentDistance[d.xml] = {};
		let parent = d.xml;
		let distance = 0;

		while (parent) {
			if (parentDistance[parent] > -1) {
				let totalDistance = parentDistance[parent] + distance;

				if (closestDistance === -1 || totalDistance <= closestDistance) {
					if (totalDistance < closestDistance) {
						filteredResults.length = 0;
					}

					closestDistance = totalDistance;
					filteredResults.push(d);
				}
			}

			subjectParentDistance[d.xml][parent] = distance;
			parent = parent.parentNode;
			++distance;
		}

		if (scopeResults.length === 0) {
			filteredResults.push(d);
		}
	});

	subjectParentDistance = filteredResults.reduce((r, f) => ({...r, ...subjectParentDistance[f.xml]}) , {});

	return {subjectParentDistance, filteredResults};
};