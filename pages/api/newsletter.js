function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
    }

    console.log(userEmail);
    res.status(200).json({ message: "This is it!" });
  }
}
export default handler;
