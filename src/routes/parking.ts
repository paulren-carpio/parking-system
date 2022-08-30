import express from "express";
import { Request, Response } from "express";
import { ParkingController } from "../controllers/ParkingController";
import _ from "lodash";

let router = express.Router();
const _parkingController = new ParkingController();

router.route("/").get(async (req: Request, res: Response) => {
  const list = await _parkingController.viewParking();

  if (_.isEmpty(list)) {
    return res.status(404).send("No available slot!");
  }

  return res.json(list);
});

router.route("/:isParking").put(async (req: Request, res: Response) => {
  try {
    const { isParking } = req.params;
    let result = {};

    if (isParking === "1") {
      result = await _parkingController.park(req.body);
    } else {
      result = await _parkingController.unPark(req.body);
    }

    if (_.isEmpty(result["list"])) {
      if (isParking === "1") {
        return res.status(404).send("No available slot!");
      } else {
        return res.status(404).send("No vehicle parked on that slot!");
      }
    }

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500);
  }
});

export default router;
