import { Arg, Mutation, Query, Resolver } from "type-graphql";
import BillsDAO from "../../DAO/bills";
import { Bill, InputBill } from "../types/bills/bill";
import { SearchArgs } from "../types/order";

@Resolver()
export class BillsResolver{
    @Query(type=>Bill)
    public async getBill(){
        let bill: Bill = await BillsDAO.getBill();
        return bill;
    }

    @Mutation(type=>Bill, {nullable: true, name: "saveBills"})
    public async saveBills(@Arg("newBill")bill : InputBill){
        return await BillsDAO.saveBill(bill);
    }

    @Query(type=> [Bill])
    public async getPraticienBills(@Arg('searchText')searchText: SearchArgs){
        let start = searchText.startDate ? new Date(searchText.startDate).toISOString() : searchText.startDate;
        let end = searchText.endDate ? new Date(searchText.endDate).toISOString() : searchText.endDate;
        let returnedBills = await BillsDAO.getPraticienBills(searchText._id, start, end);
        return returnedBills;
    }

    @Query(type => [Bill], {nullable: true})
    public async getPatientBills(@Arg('_id')_id: string){
        return await BillsDAO.getBillsPatient(_id);
    }
}