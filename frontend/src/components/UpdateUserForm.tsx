import { gql, useMutation } from '@apollo/client';
import { FormEvent, useRef } from 'react';
import { GET_USERS } from './App';

const UPDATE_USER = gql`
    mutation ($currentEmail: String!, $newName: String!, $newEmail: String!) {
        updateUser(currentEmail: $currentEmail, newName: $newName, newEmail: $newEmail) {
            id
            name
            email
        }
    }
`;

export function UpdateUserForm() {
    const currentEmailRef = useRef<HTMLInputElement>(null);
    const newNameRef = useRef<HTMLInputElement>(null);
    const newEmailRef = useRef<HTMLInputElement>(null);

    const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();

        const currentEmail = currentEmailRef.current?.value;
        const newName = newNameRef.current?.value;
        const newEmail = newEmailRef.current?.value;

        if (!currentEmail) {
            alert('Fill the user current email!');
            return;
        }

        if (!newName && !newEmail) {
            alert('Fill at least one field!');
            return;
        }

        await updateUser({
            variables: {
                currentEmail,
                newName,
                newEmail
            },
            refetchQueries: [GET_USERS]
        });
    };

    return (
        <form onSubmit={handleUpdateUser}>
            <input
                type="email"
                ref={currentEmailRef}
                id="currentEmail"
                name="currentEmail"
                placeholder="Current User Email"
            />
            <hr />
            <input
                type="text"
                ref={newNameRef}
                id="newName"
                name="newName"
                placeholder="New User Name"
            />
            <input
                type="email"
                ref={newEmailRef}
                id="newEmail"
                name="newEmail"
                placeholder="New User Email"
            />
            <button type="submit">Update</button>
        </form>
    );
}
