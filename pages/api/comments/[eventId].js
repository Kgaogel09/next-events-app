import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    const client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

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
      client.close();
      return;
    }
    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    let results;

    try {
      results = await insertDocument(client, "comments", newComment);
      newComment._id = results.insertedId;

      res.status(200).json({ message: "Successful", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comments failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ message: "This Works!", comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
      return;
    }
  }
  client.close();
}

export default handler;
