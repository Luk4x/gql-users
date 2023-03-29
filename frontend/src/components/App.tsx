import { gql, useQuery } from '@apollo/client';
import { NewUserForm } from './NewUserForm';

type User = {
    id: string;
    name: string;
    email: string;
};

export const GET_USERS = gql`
    query {
        users {
            id
            name
            email
        }
    }
`;

export function App() {
    const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

    return loading ? (
        <div>Fetching...</div>
    ) : (
        <>
            <h1>Users</h1>
            <ul>
                {data ? (
                    data?.users.map(user => (
                        <li
                            key={user.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <p>{user.name}</p>|<span>{user.email}</span>
                        </li>
                    ))
                ) : (
                    <p>No users found!</p>
                )}
            </ul>
            <NewUserForm />
        </>
    );
}
