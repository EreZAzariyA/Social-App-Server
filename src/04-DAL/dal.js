import mongoose from "mongoose";
import config from "../01-Utils/config.js";

export const mongo = mongoose;

export async function connect(){
  const db = await mongo.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoCluster}/${config.mongoDBName}`);
  console.log(`Your now connected to: ${db.connections[0].name}`);
  listenForChangesInDB(db.connection);
}

const listenForChangesInDB = async (db)=>{
  db.watch().on('change', data => console.log(`Changes: ${data.ns.coll}: with _id ${data.documentKey._id}`));
}