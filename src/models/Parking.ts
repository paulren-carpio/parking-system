import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "parking_space" })
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slotNumber: number;

  @Column()
  maxAllowedSize: string;

  @Column()
  isAvailable: number;

  @Column()
  vehicleSize: string;

  @Column("timestamp", { nullable: true, name: "creation_date" })
  creationDate: string;

  @Column("timestamp", { nullable: true, name: "update_date" })
  updateDate: string;
}
