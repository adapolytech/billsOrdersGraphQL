import {Resolver, Query} from "type-graphql";
import { Order } from "../types/order";
import BillsDAO  from "../../DAO/orders"

@Resolver()
export class OrderResolver{
    @Query(type => Order)
    public async getOrder() {
        let ord:Order;
        ord = await BillsDAO.getOrder();
        console.log(ord);
        return ord
    }
}

