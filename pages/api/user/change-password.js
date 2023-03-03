import { verifyPassword, hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

const { getSession } = require("next-auth/react");

const handler = async (req, res) => {
  if (!req.method === "PATCH") return;

  const session = getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    client.close();
    return;
  }

  const { oldPassword, newPassword } = req.body;
  const currentPassword = user.password;
  const passwordsAreEqual = verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Wrong password!" });
    client.close();
    return;
  }

  const hashedPassword = hashPassword(newPassword);

  usersCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  res.status(200).json({ message: "Password updated." });
};

export default handler;
