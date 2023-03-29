import { gql, useQuery } from '@apollo/client';

import * as Tabs from '@radix-ui/react-tabs';
import { BiLoaderAlt } from 'react-icons/bi';

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

    return (
        <main>
            <Tabs.Root defaultValue="createUser" className="TabsRoot">
                <Tabs.List className="TabsList">
                    <Tabs.Trigger className="TabsTrigger" value="createUser">
                        Create User
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="createUser">
                    <NewUserForm />
                </Tabs.Content>
            </Tabs.Root>
            <div className="usersList">
                <h2>Users List</h2>
                {loading ? (
                    <BiLoaderAlt />
                ) : (
                    <ul>
                        {data && data.users.length > 0 ? (
                            data?.users.map(user => (
                                <li key={user.id} className="userWrapper">
                                    <p>{user.name}</p>|<span>{user.email}</span>
                                </li>
                            ))
                        ) : (
                            <p>There are no registered users!</p>
                        )}
                    </ul>
                )}
            </div>
        </main>
    );
}
