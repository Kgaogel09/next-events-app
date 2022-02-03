import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
    }

    const client = await MongoClient.connect(
      "mongodb+srv://thorn:IRI0MuXdi2kEBUaE@cluster0.naxcy.mongodb.net/newsletter?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });
    client.close(); //to disconnect

    res.status(200).json({ message: "This is it!" });
  }
}
export default handler;
