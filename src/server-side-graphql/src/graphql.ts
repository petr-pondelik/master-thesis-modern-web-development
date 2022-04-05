
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Entity {
    id: string;
    createdAt: string;
}

export interface NamedEntity {
    id: string;
    createdAt: string;
    title: string;
}

export class User implements Entity {
    id: string;
    createdAt: string;
    email: string;
    password: string;
    givenName?: Nullable<string>;
    familyName?: Nullable<string>;
    profileDescription?: Nullable<string>;
    stories: Story[];
}

export class Story implements NamedEntity {
    id: string;
    createdAt: string;
    title: string;
    description?: Nullable<string>;
    content: string;
    author: User;
}

export abstract class IQuery {
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
