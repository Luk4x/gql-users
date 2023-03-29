import { gql, useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import { client } from '../lib/apollo';
import { GET_USERS } from './App';

const CREATE_USER = gql`
    mutation ($name: String!, $email: String!) {
        createUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export function NewUserForm() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

    const handleCreateUser = async (e: FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const email = emailRef.current?.value;

        if (!name || !email) {
            alert('Fill in the fields correctly!');
            return;
        }

        await createUser({
            variables: {
                name,
                email
            },
            update: (cache, { data: { createUser } }) => {
                const { users } = client.readQuery({ query: GET_USERS });

                cache.writeQuery({
                    query: GET_USERS,
                    data: {
                        users: [...users, createUser]
                    }
                });
            }
        });

        nameRef.current.value = '';
        emailRef.current.value = '';
    };

    return (
        <form onSubmit={handleCreateUser}>
            <input
                type="text"
                ref={nameRef}
                id="name"
                name="name"
                placeholder="User Name"
            />
            <input
                type="email"
                ref={emailRef}
                id="email"
                name="email"
                placeholder="User Email"
            />
            <button type="submit">Create</button>
        </form>
    );
}
