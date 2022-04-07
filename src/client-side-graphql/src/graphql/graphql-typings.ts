
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
    id: string;
    createdAt: string;
}

export interface NamedEntity {
    id: string;
    createdAt: string;
    title: string;
}

export interface AuthPayload {
    access_token: string;
}

export interface User extends Entity {
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

export interface Story extends NamedEntity {
    id: string;
    createdAt: string;
    title: string;
    description?: Nullable<string>;
    content: string;
    author: User;
}

export interface ReadingList extends NamedEntity {
    id: string;
    createdAt: string;
    title: string;
    author: User;
    stories: Story[];
}

export interface IQuery {
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    story(id: string): Nullable<Story> | Promise<Nullable<Story>>;
    stories(searchString: string, limit?: Nullable<number>): Nullable<Story>[] | Promise<Nullable<Story>[]>;
}

export interface IMutation {
    signIn(content: SignInContent): Nullable<AuthPayload> | Promise<Nullable<AuthPayload>>;
    createStory(content: CreateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;
    updateStory(id: string, content: UpdateStoryContent): Nullable<Story> | Promise<Nullable<Story>>;
    deleteStory(id: string): Nullable<Story> | Promise<Nullable<Story>>;
    createReadingList(content: CreateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    updateReadingList(title: string, userId: number, content: UpdateReadingListContent): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    deleteReadingList(title: string, userId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    addStoryIntoReadingList(title: string, userId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
    removeStoryFromReadingList(title: string, userId: number, storyId: number): Nullable<ReadingList> | Promise<Nullable<ReadingList>>;
}

type Nullable<T> = T | null;
