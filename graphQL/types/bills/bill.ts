import {Field, ObjectType, ID, Float, InputType} from "type-graphql";
import { infoPatient, infoPraticien } from "../order";
import { PatientInfo } from "../patient";
import { PraticienInfo } from "../praticien";
import { InputItem, Item } from "./item"

@ObjectType()
export class Bill{
    @Field(type=> ID)
    _id: string;

    @Field()
    praticien: PraticienInfo;

    @Field()
    patient: PatientInfo;

    @Field(type=>Float, {nullable: true})
    total: string;

    @Field({defaultValue: new Date(Date.now())})
    date: Date;

    @Field(type=>[Item])
    items: Item[];

    @Field(type =>[String],{nullable: true})
    assurances: string[];

    @Field(type=>String, {nullable: true})
    file_url: string;

}

@InputType()
export class InputBill{
    @Field()
    praticien: infoPraticien;

    @Field()
    patient: infoPatient;

    @Field(type=> [InputItem])
    items: InputItem[];

    @Field(type=>Date,{defaultValue: new Date(Date.now())})
    date: Date;

    @Field(type=>Float)
    total: string;

    @Field(type=>[String],{nullable: true})
    assurances: string[];
}