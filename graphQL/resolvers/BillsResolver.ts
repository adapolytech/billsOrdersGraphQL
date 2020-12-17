import { Arg, Mutation, Query, Resolver } from "type-graphql";
import BillsDAO from "../../DAO/bills";
import { Bill, InputBill } from "../types/bills/bill";

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
}