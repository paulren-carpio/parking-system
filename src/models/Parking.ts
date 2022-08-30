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

// create database parking;

// create table parking.parking_space (
// 	`id` int(11) NOT NULL AUTO_INCREMENT,
//     `slot_number` int(11) NOT NULL,
//     `max_allowed_size` char(2) NOT NULL,
//     `is_available` tinyint(1) NOT NULL DEFAULT 1,
//     `vehicle_size` char(1),
//     `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     `update_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (`id`)
// );
