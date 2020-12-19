import {Resolver, Query, Mutation, Arg, Int} from "type-graphql";
import { Order, newOrder, SearchArgs } from "../types/order";
import BillsDAO  from "../../DAO/orders"
import OrdersDAO from "../../DAO/orders";

@Resolver()
export class OrderResolver{
    @Query(type => Order)
    public async getOrder() {
        let ord: Order;
        ord = await BillsDAO.getOrder();
        console.log(ord);
        return ord
    }

    @Query(type => [Order])
    public async getPraticienOrders(@Arg('_id')_id: string,
     @Arg('startDate',{nullable: true})startDate: string,
     @Arg('endDate',{nullable: true})endDate: string){
        let start = startDate ? new Date(startDate).toISOString() : startDate;
        let end = endDate ? new Date(endDate).toISOString() : endDate; 
        console.log(start,end)
        const orderFromBD = await OrdersDAO.getPraticienOrders(_id, start, end);
        console.log(orderFromBD);
        return orderFromBD;
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

