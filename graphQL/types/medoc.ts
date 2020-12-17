import {Field, Int, ObjectType} from "type-graphql"

@ObjectType()
export class Doc{

    @Field() designation: string;

    @Field({nullable: true}) usage: string
}