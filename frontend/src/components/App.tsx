import { gql, useQuery } from '@apollo/client';

import * as Tabs from '@radix-ui/react-tabs';
import { BiLoaderAlt } from 'react-icons/bi';

import { NewUserForm } from './NewUserForm';
import { UpdateUserForm } from './UpdateUserForm';
import { DeleteUserForm } from './DeleteUserForm';

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
                        Create
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="updateUser">
                        Update
                    </Tabs.Trigger>
                    <Tabs.Trigger className="TabsTrigger" value="deleteUser">
                        Delete
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="TabsContent" value="createUser">
                    <NewUserForm />
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="updateUser">
                    <UpdateUserForm />
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="deleteUser">
                    <DeleteUserForm />
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
