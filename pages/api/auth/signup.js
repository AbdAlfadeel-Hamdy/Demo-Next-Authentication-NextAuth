const { hashPassword } = require("@/lib/auth");
const { connectToDatabase } = require("@/lib/db");

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const { email, password } = req.body;
  if (!email || !email.includes("@") || !password || password.length < 7) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 charachters long",
    });
  }

  const client = await connectToDatabase();
  const db = client.db();

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "Created user!" });
};

export default handler;
