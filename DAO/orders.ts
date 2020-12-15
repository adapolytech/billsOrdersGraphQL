import doten from "dotenv"
import { Collection, MongoClient } from "mongodb";
import { Order } from "../graphQL/types/order";
doten.config();

let orders: Collection;

export default class OrdersDAO{

    static async injectBD(client: MongoClient){
        try {
            orders = await client.db(process.env.DB_NAME).collection(process.env.COLLECTION_ORDERS);
        } catch (error) {
            console.log("Error when trying to connect to the mongodb database server");
        }
    }

    static async getOrder(): Promise<Order>{
        let filter = {};
        let projec = { projection: {patient: true, doctor: true }};

        try {
            return await orders.findOne({},projec);
        } catch (error) {
            
        }
    }
}