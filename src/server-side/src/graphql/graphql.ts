
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

export class CreateReadingListContent {
    title: string;
    authorId: number;
}

export class UpdateReadingListContent {
    title: string;
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

export interface Entity {
    id: string;
    createdAt: string;
}

export interface NamedEntity {
    id: string;
    createdAt: string;
    title: string;
}

export class Jwt {
    access_token: string;
}

export abstract class IQuery {
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract story(id: string): Nullable<Story> | Promise<Nullable<Story>>;

    abstract stories(searchString: string, limit?: Nullable<number>): Nullable<Story>[] | Promise<Nullable<Story>[]>;
}

export abstract class IMutation {
    abstract signIn(content: SignInContent): Nullable<Jwt> | Promise<Nullable<Jwt>>;

    abstract createStory(content: CreateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;

    abstract updateStory(id: string, content: UpdateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;

    abstract deleteStory(id: string): Nullable<Story> | Promise<Nullable<Story>>;

    abstract createReadingList(content: CreateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract updateReadingList(title: string, userId: number, content: UpdateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract deleteReadingList(title: string, userId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract addStoryIntoReadingList(title: string, userId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;

    abstract removeStoryFromReadingList(title: string, userId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
}

export class ReadingList implements NamedEntity {
    id: string;
    createdAt: string;
    title: string;
    author: User;
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

export class User implements Entity {
    id: string;
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

type Nullable<T> = T | null;