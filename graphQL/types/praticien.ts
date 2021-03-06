import {Field, ObjectType, ID, Int} from "type-graphql"

@ObjectType()
export class PraticienInfo{

    @Field()
    _id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({nullable: true})
    contact: string;

    @Field({nullable: true})
    specialite: string
}