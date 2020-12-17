import "reflect-metadata";
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { OrderResolver } from "../graphQL/resolvers/OrderResolver";
import express from "express"
import { MongoClient } from "mongodb";
import OrdersDAO from "../DAO/orders"
import { GraphQLSchema } from "graphql";

let Appschema;
async function buildAppSchema(){
    return await buildSchema({
        resolvers: [OrderResolver], 
    })
};

Appschema = buildAppSchema();
// buildAppSchema();
console.log(Appschema);

const server = new ApolloServer({
    schema: Appschema,
});

const app = express()
server.applyMiddleware({app: app, path: '/graphql' });

(function connectAndStart(){
 MongoClient.connect(process.env.MONGO_DB_URI,{useUnifiedTopology: true}).then(async (client)=>{
    await OrdersDAO.injectBD(client);
    app.listen(3000, ()=>{
        console.log("Server listen at http://localhost:3000");
    })
 })
})();