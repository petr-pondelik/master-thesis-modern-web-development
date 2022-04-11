
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class SignInContent {
    email: string;
    password: string;
}

export class CreateStoryContent {
    title: string;
    description?: Nullable<string>;
    content: string;
    authorId: number;
}

export class UpdateStoryContent {
    title: string;
    description?: Nullable<string>;
    content: string;
}

export class CreateReadingListContent {
    title: string;
    authorId: number;
}

export class UpdateReadingListContent {
    title: string;
}

export interface Entity {
    id: number;
    createdAt: string;
}

export interface NamedEntity {
    id: number;
    createdAt: string;
    title: string;
}

export class AuthPayload {
    access_token: string;
}

export class User implements Entity {
    id: number;
    createdAt: string;
    email: string;
    givenName?: Nullable<string>;
    familyName?: Nullable<string>;
    profileDescription?: Nullable<string>;
    stories: Story[];
    story?: Nullable<Story>;
    readingLists: ReadingList[];
    readingList?: Nullable<ReadingList>;
}

export class Story implements NamedEntity {
    id: number;
    createdAt: string;
    title: string;
    description?: Nullable<string>;
    content: string;
    author: User;
}

export class ReadingList implements NamedEntity {
    id: number;
    createdAt: string;
    title: string;
    author: User;
    stories: Story[];
}

export abstract class IQuery {
    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract story(id: number): Nullable<Story> | Promise<Nullable<Story>>;

    abstract stories(searchString: string, limit?: Nullable<number>): Nullable<Story>[] | Promise<Nullable<Story>[]>;
}

export abstract class IMutation {
    abstract signIn(content: SignInContent): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;

    abstract createStory(content: CreateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;

    abstract updateStory(id: number, content: UpdateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;

    abstract deleteStory(id: number): Nullable<Story> | Promise<Nullable<Story>>;

    abstract createReadingList(content: CreateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract updateReadingList(id: number, content: UpdateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract deleteReadingList(id: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract addStoryIntoReadingList(readingListId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract removeStoryFromReadingList(readingListId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
}

type Nullable<T> = T | null;
