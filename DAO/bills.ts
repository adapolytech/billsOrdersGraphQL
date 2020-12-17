import doten from "dotenv"
import { Collection, MongoClient } from "mongodb";
import { Bill, InputBill } from "../graphQL/types/bills/bill";
doten.config();

let bills: Collection;

export default class BillsDAO{

    static async injectBD(client: MongoClient){
        try {
            bills = client.db(process.env.DB_NAME).collection(process.env.COLLECTION_BILLS);
        } catch (error) {
            console.log("Error when trying to connect to the mongodb database server");
        }
    }

    static async getBill(): Promise<Bill>{
        let filter = {};
        let projec = { projection: {patient: true, doctor: true }};

        try {
            return bills.findOne({});
        } catch (error) {
            
        }
    }

    static async saveBill(bill: InputBill){
        let doc = JSON.stringify(bill);
        let b = JSON.parse(doc);
        console.log(doc);
        try {
            let response = await bills.insertOne(b);
            b._id = response.insertedId;
            return b;
        } catch (error) {
            return "Error"
        }
    }
}