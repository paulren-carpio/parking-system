import { ParkingRepository } from "../repositories/ParkingRepository";

export class ParkingController {
  /**
   * Assigned a slot
   * @param params
   */
  async park(params: any) {
    const _parkingRepo = new ParkingRepository();
    const slots = await _parkingRepo.park(params);

    const data = {
      list: slots,
    };

    return data;
  }

  /**
   * Leave a slot
   * @param params
   */
  async unPark(params: any) {
    const _parkingRepo = new ParkingRepository();
    const slots = await _parkingRepo.unPark(params);

    const data = {
      list: slots,
    };

    return data;
  }

  /**
   * Retrieves a list of slots
   *
   */
  async viewParking() {
    const _parkingRepo = new ParkingRepository();
    const slots = await _parkingRepo.viewParking();

    const data = {
      list: slots,
    };

    return data;
  }
}
