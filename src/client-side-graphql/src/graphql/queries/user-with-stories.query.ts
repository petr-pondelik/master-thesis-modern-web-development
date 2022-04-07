import { gql, useQuery } from '@apollo/client';
import { User } from '../graphql-typings';

const QUERY = gql`
    query UserWithStories($id: ID!, $limit: Int)
    {
        user (id: $id) {
            id
            email
            givenName
            familyName
            stories (limit: $limit) {
                id
                createdAt
                title
                description
            }
        }
    }
`;

interface IUserWithStoriesData {
    user: User;
}

interface IUserWithStoriesVars {
    id: string;
    limit?: number
}

export function useUserWithStoriesQuery(_variables: IUserWithStoriesVars) {
    return useQuery<IUserWithStoriesData, IUserWithStoriesVars>(QUERY, {
        variables: _variables,
    });
}
