
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface SignInContent {
    email: string;
    password: string;
}

export interface CreateStoryContent {
    title: string;
    description?: Nullable<string>;
    content: string;
    authorId: number;
}

export interface UpdateStoryContent {
    title: string;
    description?: Nullable<string>;
    content: string;
}

export interface CreateReadingListContent {
    title: string;
    authorId: number;
}

export interface UpdateReadingListContent {
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

export interface AuthPayload {
    access_token: string;
}

export interface User extends Entity {
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

export interface Story extends NamedEntity {
    id: number;
    createdAt: string;
    title: string;
    description?: Nullable<string>;
    content: string;
    author: User;
}

export interface ReadingList extends NamedEntity {
    id: number;
    createdAt: string;
    title: string;
    author: User;
    stories: Story[];
}

export interface IQuery {
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
    story(id: number): Nullable<Story> | Promise<Nullable<Story>>;
    stories(searchString: string, limit?: Nullable<number>): Nullable<Story>[] | Promise<Nullable<Story>[]>;
}

export interface IMutation {
    signIn(content: SignInContent): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    createStory(content: CreateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;
    updateStory(id: number, content: UpdateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;
    deleteStory(id: number): Nullable<Story> | Promise<Nullable<Story>>;
    createReadingList(content: CreateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    updateReadingList(id: number, content: UpdateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    deleteReadingList(id: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    addStoryIntoReadingList(readingListId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    removeStoryFromReadingList(readingListId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
}

type Nullable<T> = T | null;
