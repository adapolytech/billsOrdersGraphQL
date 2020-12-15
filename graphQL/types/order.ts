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

    prescriptions: [string]
    @Field(type => [Doc], {name: "prescriptions"})
    resolveMedoc(){
        if(!this.prescriptions) return []
    }

    @Field()
    date: Date
    
}