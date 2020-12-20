import doten from "dotenv"
import { Collection, MongoClient, ObjectId } from "mongodb";
import { Bill, InputBill } from "../graphQL/types/bills/bill";
import { createBillPdf } from "../storage/billGenerate/genBill"
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
        let filePath = await createBillPdf(b);
        b.file_url = filePath;
        console.log(doc);
        try {
            let response = await bills.insertOne(b);
            b._id = response.insertedId;
            return b;
        } catch (error) {
            return "Error"
        }
    }

    static async getBillsPatient(_id: string){
        let $id = new ObjectId(_id);
        let filter = {'patient._id': _id};
        try {
            return await bills.find(filter).sort({date: -1}).toArray();
        } catch (error) {
            return error
        }
    }

    //get praticien Bills
    static async getPraticienBills(id: string, startDate?: string, endDate?: string){
        // const $id = new ObjectId(id);
        let filter = {};
        filter = {'praticien._id': id};
        if(startDate){
            filter = {'praticien._id': id, date: {$gte: startDate}}
        }
        if(startDate && endDate){
            filter = {'praticien._id': id, date: {$gte: new Date(startDate), $lt: new Date(endDate)}};
        }
        console.log(filter)
        let sortBy = { 'date': -1 };
        try {
            return await bills.find(filter).sort(sortBy).toArray();
        } catch (error) {
            return error   
        }
    }

}