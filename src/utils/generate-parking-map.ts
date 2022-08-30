export const generateParkingMap = (list = []) => {
  const entries = ["A", "B", "C"];
  let idx = 0;

  for (let row = 0; row < 12; row++) {
    let val = "";
    for (let entry = 0; entry < entries.length; entry++) {
      for (let slot = 0; slot < 3; slot++) {
        if (row === 0) {
          val += slot % 2 ? "+|  " + entries[entry] + "  |+" : "+++++++";
        } else if (row === 1) {
          val += "--------";
        } else {
          const { maxAllowedSize, vehicleSize, isAvailable } = list[idx];
          idx += slot % 2 ? 0 : 1;

          val +=
            slot % 2
              ? "-----"
              : "| " +
                (idx <= 9 ? "0" + idx : idx) +
                "-" +
                (isAvailable ? maxAllowedSize + " " : vehicleSize + "**") +
                "|";
        }
      }
    }

    console.log(val);
  }
};
