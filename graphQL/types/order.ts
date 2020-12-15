import {Field, ObjectType} from "type-graphql"
import {Doc} from "./medoc";
import {PatientInfo} from "./patient";
import {PraticienInfo} from "./praticien"

@ObjectType()
export class Order{

    @Field()
    medecin: PraticienInfo;

    @Field()
    patient: PatientInfo;

    medoc: [string]
    @Field(type => [Doc], {name: "medoc"})
    resolveMedoc(){
        if(!this.medoc) return []
    }

    @Field()
    date: Date
    
}