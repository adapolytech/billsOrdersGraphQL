import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { OrderResolver } from "../graphQL/resolvers/resolver";
import express from "express"
import { MongoClient } from "mongodb";
import OrdersDAO from "../DAO/orders"
import { GraphQLSchema } from "graphql";

let Appschema: GraphQLSchema;
(async function buildAppSchema(){
    await buildSchema({
        resolvers: [OrderResolver], 
    }).then(schema=>{
        Appschema = schema
    });
})();

// buildAppSchema();

const server = new ApolloServer({
    schema: Appschema,
});

const app = express()
server.applyMiddleware({app: app, path: '/graphql' });

(function connectAndStart(){
 MongoClient.connect(process.env.MONGO_DB_URI).then(async (client)=>{
    await OrdersDAO.injectBD(client);
    app.listen(3000, ()=>{
        console.log("Server listen at http://localhost:3000");
    })
 })
})();

console.log(10);