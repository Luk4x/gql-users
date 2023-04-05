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
        const user = this.data.find(user => user.email === currentEmail);
        console.log(this.data, user);

        if (user) {
            const updatedUser = {
                ...user,
                name: newName ? newName : user.name,
                email: newEmail ? newEmail : user.email
            };

            const userIndex = this.data.findIndex(user => user.email === currentEmail);
            this.data.splice(userIndex, 1);
            this.data.push(updatedUser);

            console.log(this.data, userIndex);

            return updatedUser;
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
