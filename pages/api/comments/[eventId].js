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
    const dummyList = [
      { id: "c1", name: "Thorn", text: "First Comment" },
      { id: "c2", name: "Max", text: "Second Comment" },
    ];

    res.status(200).json({ message: "This Works!", comments: dummyList });
  }
  const db = client.db();
}

export default handler;
