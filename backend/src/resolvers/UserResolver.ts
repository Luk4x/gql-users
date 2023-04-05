import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import crypto from 'crypto';
import { User } from '../models/User';

@Resolver()
export class UserResolver {
    private data: User[] = [];

    @Query(() => String)
    async hello() {
        return 'Yo world';
    }

    @Query(() => [User])
    async users() {
        return this.data;
    }

    @Mutation(() => User)
    async createUser(@Arg('name') name: String, @Arg('email') email: String) {
        const newUser = { id: crypto.randomUUID(), name, email };

        this.data.push(newUser);

        return newUser;
    }

    @Mutation(() => User)
    async updateUser(
        @Arg('currentEmail') currentEmail: String,
        @Arg('newName') newName: String,
        @Arg('newEmail') newEmail: String
    ) {
        const userIndex = this.data.findIndex(user => user.email === currentEmail);

        if (userIndex !== -1) {
            const user = this.data[userIndex];

            this.data[userIndex] = {
                ...user,
                name: newName ? newName : user.name,
                email: newEmail ? newEmail : user.email
            };

            // updated user
            return this.data[userIndex];
        }
    }

    @Mutation(() => User)
    async deleteUser(@Arg('email') email: String) {
        const userIndex = this.data.findIndex(user => user.email === email);

        if (userIndex !== -1) {
            const deletedUser = this.data[userIndex];

            this.data.splice(userIndex, 1);
            return deletedUser;
        }
    }
}
