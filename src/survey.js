import parse from 'glance-parser';

export class Survey {
	constructor({data, reference}) {
		this.data = data;
		this.reference = reference;
		this.remainingTargets = parse(reference);
	}
}