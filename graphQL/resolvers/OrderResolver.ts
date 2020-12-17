import {Resolver, Query, Mutation, Arg, Int} from "type-graphql";
import { Order, newOrder } from "../types/order";
import BillsDAO  from "../../DAO/orders"

@Resolver()
export class OrderResolver{
    @Query(type => Order)
    public async getOrder() {
        let ord: Order;
        ord = await BillsDAO.getOrder();
        console.log(ord);
        return ord
    }

    @Mutation(type => Int, {nullable: true})
    public async saveOrder(
        @Arg("order", {nullable: true})
        order: newOrder)
        {
        // console.log(order);
        let response = await BillsDAO.createOrder(order);
        console.log(response);
        return 10
    }

    @Mutation(type=>Int)
    public getInt(@Arg("name")name: String){
        console.log(name);
        return 10;
    }
}

