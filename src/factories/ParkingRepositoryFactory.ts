import db from "../providers/typeorm";
import { Parking } from "../models/Parking";

export class ParkingRepositoryFactory {
  static async createInstance() {
    const connection = await db.getConnection();
    const repository = connection.getRepository(Parking);
    return repository;
  }
}
