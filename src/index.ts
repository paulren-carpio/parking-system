import express from "express";
import cors from "cors";
import parking from "./routes/parking";
import db from "./providers/typeorm";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/parking-system/parking", parking);

app.get("/parking-system", (req, res) => {
  res.send("ok");
});

app.listen(5000, async (error) => {
  const connection = db.getConnection();

  if (!connection) {
    await db.initialize();
  }

  if (error) {
    return console.log(`Error: ${error}`);
  }
  console.log("Server is listening on port 5000");
});

export default app;
