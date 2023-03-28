import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    @Field(_type => ID)
    id: String;

    @Field()
    name: String;

    @Field()
    email: String;
}
