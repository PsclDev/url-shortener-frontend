export interface Link {
	id: string;
	url: string;
	slug?: string;
	updatedAt: Date;
}

export interface StoreInterface {
	links: Link[];
}
