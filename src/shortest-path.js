export default function (subjectResults, scopeResults, parentDistance) {
	let subjectParentDistance = {};
	let closestDistance = -1;
	let filteredResults = [];

	subjectResults.forEach(d => {
		let parent = d.xml;
		let distance = 0;

		while (parent) {
			if (parentDistance[parent]) {
				let totalDistance = parentDistance[parent] + distance;

				if (closestDistance === -1 || totalDistance <= closestDistance) {
					if (totalDistance < closestDistance)
						filteredResults.length = 0;

					closestDistance = totalDistance;
					filteredResults.push(d);
					return;
				}

				return;
			}

			if (!subjectParentDistance[parent] || distance < subjectParentDistance[parent]) subjectParentDistance[parent] = distance;
			parent = parent.parentNode;
			++distance;
		}

		if (scopeResults.length === 0) {
			filteredResults.push(d);
			return;
		}

		return;
	});

	return {subjectParentDistance, filteredResults};
};