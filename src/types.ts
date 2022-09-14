export interface NoticeQuery {
    forename?: string;
    name?: string;
    nationality?: string;
    ageMax?: string;
    ageMin?: string;
    freeText?: string;
    sexId?: string;
    arrestWarrantyCountryId?: string;
    page?: string;
    resultPerPage?: string;
}

export interface ImageLink {
    href: string;
}
export interface EmbeddedNotice {
    forename: string;
    name: string;
    date_of_birth: string;
    entity_id: string;
    nationalities: ReadonlyArray<string>;
    _links: {
        images: ImageLink;
        thumbnail: ImageLink;
        self: ImageLink;
    };
}

export interface Notice {
    query: NoticeQuery;
    total: number;
    _embedded: {
        notices: ReadonlyArray<EmbeddedNotice>;
    };
    _links: {
        first: ImageLink;
        self: ImageLink;
        last: ImageLink;
    };
}


export type Status = "rest" | "loading" | "success" | "failure" | "empty";