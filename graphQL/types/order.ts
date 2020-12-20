import {Field, ID, InputType, ObjectType} from "type-graphql"
import {Doc} from "./medoc";
import {PatientInfo} from "./patient";
import {PraticienInfo} from "./praticien"

@ObjectType()
export class Order{

    @Field(type => ID,{nullable: true})
    _id: string;

    @Field()
    praticien: PraticienInfo;

    @Field()
    patient: PatientInfo;

    prescriptions: [string]
    @Field(type => [Doc], {name: "prescriptions"})
    resolveMedoc(){
        if(!this.prescriptions) return []
        return this.prescriptions
    }

    date: Date
    @Field(type => Date, {name:"date"})
    resolveDate(){
        return new Date(this.date);
    }

    @Field({nullable: true})
    file_url: string;

    
}

@InputType("infoPatient")
export class infoPatient{
    @Field(type => ID, {nullable: true})
    _id: string

    @Field({nullable: true})
    fullName: string
}

@InputType("infoPraticien")
export class infoPraticien{
    @Field(type=> ID)
    _id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    specialite: string;

    @Field({nullable: true})
    contact: string;
}

@InputType()
export class InputDoc{
    @Field()
    designation: string;

    @Field()
    usage: string;
}

@InputType("newOrder")
export class newOrder{
    @Field(type=> infoPraticien)
    praticien: infoPraticien
    
    @Field(type => infoPatient)
    patient: infoPatient

    @Field(type => [InputDoc],{nullable: true})
    prescriptions: InputDoc[]

    @Field()
    date: Date
}

@InputType()
export class SearchArgs{
    @Field()
    _id: string;

    @Field(type=> String, {nullable: true})
    startDate: string;

    @Field(type=> String, {nullable: true})
    endDate: string;
}
