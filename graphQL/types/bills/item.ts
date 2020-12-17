import {Field, Int, Float, ObjectType, InputType} from "type-graphql"

@ObjectType()
export class Item{
    @Field()
    designation: string;

    @Field({nullable: true})
    duree: string

    @Field(type=> Float)
    price: string;
}

@InputType()
export class InputItem{
    @Field()
    designation: string;

    @Field()
    duree: string;

    @Field(type=> Float)
    price: string
}