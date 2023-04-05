import { FormEvent, useRef } from 'react';

import { gql, useMutation } from '@apollo/client';
import { GET_USERS } from './App';

const DELETE_USER = gql`
    mutation ($email: String!) {
        deleteUser(email: $email) {
            id
            name
            email
        }
    }
`;

export function DeleteUserForm() {
    const emailRef = useRef<HTMLInputElement>(null);

    const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);

    const handleDeleteUser = async (e: FormEvent) => {
        e.preventDefault();

        const email = emailRef.current?.value;

        if (!email) {
            alert('Fill the email field!');
            return;
        }

        await deleteUser({ variables: { email }, refetchQueries: [GET_USERS] });
    };

    return (
        <form onSubmit={handleDeleteUser}>
            <input
                type="email"
                ref={emailRef}
                id="email"
                name="email"
                placeholder="User Email"
            />
            <button type="submit">Delete</button>
        </form>
    );
}
