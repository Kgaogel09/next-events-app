import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://thorn:IRI0MuXdi2kEBUaE@cluster0.naxcy.mongodb.net/events?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "invalid input" });
      return;
    }
    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    const db = client.db();

    const results = await db.collection("comments").insertOne(newComment);

    console.log(results);

    newComment.id = results.insertedId;

    res.status(200).json({ message: "Successful", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ message: "This Works!", comments: documents });
  }
  client.close();
}

export default handler;
