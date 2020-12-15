import {Field, ObjectType, ID, Int} from "type-graphql"

@ObjectType()
export class PatientInfo{

    @Field({nullable: true})
    _id?: string;

    @Field()
    fullName: string
}