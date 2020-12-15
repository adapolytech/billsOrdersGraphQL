import doten from "dotenv"
import { Collection, MongoClient } from "mongodb";
doten.config();

let bills: Collection;

export default class BillsDAO{

    static async injectBD(client: MongoClient){
        try {
            bills = await client.db(process.env.DB_NAME).collection(process.env.COLLECTION_BILLS);
        } catch (error) {
            console.log("Error when trying to connect to the mongodb database server");
        }
    }

    static async getBills(){
        let filter = {};
        let projec = { projection: {patient: true, doctor: true }};

        try {
            return bills.findOne({},projec);
        } catch (error) {
            
        }
    }
}