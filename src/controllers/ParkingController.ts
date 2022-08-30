import { ParkingRepository } from "../repositories/ParkingRepository";

export class ParkingController {
  /**
   * Assigned slot
   * @param params
   */
  async park(params: any) {
    const _parkngRepo = new ParkingRepository();
    const slots = await _parkngRepo.park(params);

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
    const _parkngRepo = new ParkingRepository();
    const slots = await _parkngRepo.unPark(params);

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
    const languages = await _parkingRepo.viewParking();

    const data = {
      list: languages,
    };

    return data;
  }
}
