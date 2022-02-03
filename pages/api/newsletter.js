import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "connection to database failed" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close(); //to disconnect
    } catch (error) {
      res.status(500).json({ message: "connection to database failed" });
      return;
    }

    res.status(200).json({ message: "Signed up!" });
  }
}
export default handler;
