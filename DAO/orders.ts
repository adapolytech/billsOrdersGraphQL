import doten from "dotenv"
import { Collection, MongoClient } from "mongodb";
import { newOrder, Order } from "../graphQL/types/order";
import {ObjectId} from "bson";
import {createPdfOrder} from "../storage/generate"

doten.config();

let orders: Collection;

export default class OrdersDAO{

    static async injectBD(client: MongoClient){
        try {
            orders = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_ORDERS);
        } catch (error) {
            console.log("Error when trying to connect to the mongodb database server");
        }
    }

    static async getOrder(): Promise<Order>{
        let filter = {};
        // let projec = { projection: {patient: true, doctor: true }};

        try {
            return await orders.findOne({});
        } catch (error) {
            
        }
    }

    static async getPraticienOrders(id: string, startDate?: string, endDate?: string){
        // const $id = new ObjectId(id);
        let filter = {};
        filter = {'praticien._id': id};
        if(startDate){
            console.log('yes');
            filter = {'praticien._id': id, date: {$gt: startDate}}
        }
        if(startDate && endDate){
            console.log('yes')
            filter = {'praticien._id': id, date: {$gt: new Date(startDate), $lt: new Date(endDate)}};
        }
        console.log(filter)
        let sortBy = { 'date' :-1 };
        try {
            return await orders.find(filter).sort(sortBy).toArray();
        } catch (error) {
         return error   
        }
    }

    static async getPatientOrders(id: string){
        const $id = new ObjectId(id);
        let filter = {'patient._id': $id};
        try {
            return await orders.find(filter).toArray();
        } catch (error) {
            
        }
    }

    static async createOrder(order: newOrder): Promise<any>{
        const toJSON = JSON.stringify(order);
        const doc = JSON.parse(toJSON);
        let url = await createPdfOrder(doc);
        doc.file_url = url;
        try {
            const response =  await orders.insertOne(doc);
            return response.insertedId;
        } catch (error) {
            return new Error("Not inserted");
        }

    }
}