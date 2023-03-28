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
}
