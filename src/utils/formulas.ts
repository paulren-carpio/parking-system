import _ from "lodash";

export const getParkingFee = (hours = 0, size = "") => {
  const roundOffHours = Math.round(hours);
  const maxFlatRateHours = 3;
  const flatRate = 40;
  const parkingRate = { S: 20, M: 60, L: 100 };

  const total =
    (roundOffHours > 24 ? Math.trunc(roundOffHours / 24) * 5000 : flatRate) +
    parkingRate[size] *
      Math.max(
        0,
        roundOffHours > 24
          ? roundOffHours % 24
          : roundOffHours - maxFlatRateHours
      );

  return total;
};

export const getNearestAvailableSlot = (
  gate = "",
  vehicleSize = "",
  list = []
) => {
  const slotDistance = [];
  const maxAllowedSizes =
    vehicleSize === "S"
      ? ["SP", "MP", "LP"]
      : vehicleSize === "M"
      ? ["MP", "LP"]
      : ["LP"];

  for (let entry = 0; entry < 3; entry++) {
    let val = 0;
    let slotNum = 0;

    if (gate === "A") {
      val = entry === 0 ? 1 : entry === 1 ? 4 : 7;
    } else if (gate === "B") {
      val = [0, 2].includes(entry) ? 4 : entry;
    } else if (gate === "C") {
      val = entry === 0 ? 7 : entry === 1 ? 4 : 1;
    }
    for (let row = 0; row < 10; row++) {
      for (let slot = 1; slot <= 2; slot++) {
        slotNum = 5 * row + entry * 2;
        const lst = list[slotNum + slot + row - 1];

        if (!_.isEmpty(lst)) {
          const { id, slotNumber, isAvailable, maxAllowedSize } = lst;

          slotDistance.push({
            id,
            slotNumber,
            distance: row + val + 1,
            column: entry === 0 ? "A" : entry === 1 ? "B" : "C",
            isAvailable,
            maxAllowedSize,
          });
        }
      }
    }
  }

  const newVal = _.filter(slotDistance, (lst) => {
    return (
      lst.isAvailable === 1 && maxAllowedSizes.includes(lst.maxAllowedSize)
    );
  });

  return _.orderBy(
    newVal,
    ["distance", "column", "maxAllowedSize"],
    ["asc", "asc", "asc"]
  ).shift();
};
