import {Field, ObjectType, ID, Int} from "type-graphql"

@ObjectType()
export class PraticienInfo{

    @Field()
    _id: string;

    @Field()
    fullName: string

    @Field()
    contact: string
}