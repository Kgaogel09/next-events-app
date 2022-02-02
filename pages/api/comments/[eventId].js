function handler() {
  const eventId = req.query.eventId;

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
      id: new Date().toISOString,
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(200).json({ message: "Successful", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Thorn", text: "First Comment" },
      { id: "c2", name: "Max", text: "Second Comment" },
    ];

    res.status(200).json({ message: "This Works!", comments: dummyList });
  }
}

export default handler;
