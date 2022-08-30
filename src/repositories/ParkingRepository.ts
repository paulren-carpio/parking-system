import { ParkingRepositoryFactory } from "../factories/ParkingRepositoryFactory";
import { generateParkingMap } from "../utils/generate-parking-map";
import { getNearestAvailableSlot, getParkingFee } from "../utils/formulas";
import _ from "lodash";

export interface IParkingParams {
  id: number;
  slotNumber: number;
  maxAllowedSize: string;
  isAvailable: number;
  vehicleSize: string;
  totalHours?: number;
  parkingFee?: number;
  gate?: string;
}

export class ParkingRepository {
  async park(params: IParkingParams) {
    if (_.isEmpty(params)) {
      return [];
    }

    const parkingRepositoryFactory =
      await ParkingRepositoryFactory.createInstance();

    const { vehicleSize, gate } = params[0];
    const list = await parkingRepositoryFactory.find();

    if (_.isEmpty(list)) {
      return [];
    }

    const nearestAvailableSlot = getNearestAvailableSlot(
      gate,
      vehicleSize,
      list
    );

    if (!_.isEmpty(nearestAvailableSlot)) {
      const { id, slotNumber } = nearestAvailableSlot;

      return await parkingRepositoryFactory.save({
        id,
        slotNumber,
        isAvailable: 0,
        vehicleSize,
      });
    } else {
      return [];
    }
  }

  async unPark(params: IParkingParams) {
    if (_.isEmpty(params)) {
      return [];
    }

    const parkingRepositoryFactory =
      await ParkingRepositoryFactory.createInstance();

    const { totalHours, slotNumber } = params[0];

    const list = await parkingRepositoryFactory.findOne({
      where: {
        slotNumber,
        isAvailable: 0,
      },
    });

    if (_.isEmpty(list)) {
      return [];
    }

    const totalParkingFee = getParkingFee(totalHours, list.vehicleSize) || 0;

    if (totalParkingFee) {
      await parkingRepositoryFactory.save({
        id: list.id,
        isAvailable: 1,
        vehicleSize: "",
      });

      return { id: list.id, totalParkingFee };
    }
  }

  async viewParking() {
    const parkingRepositoryFactory =
      await ParkingRepositoryFactory.createInstance();

    const list = await parkingRepositoryFactory.find({
      order: {
        slotNumber: "ASC",
      },
    });

    if (_.isEmpty(list)) {
      return [];
    }

    generateParkingMap(list);

    return list;
  }
}
