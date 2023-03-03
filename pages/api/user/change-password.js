const { getSession } = require("next-auth/react");

const handler = async (req, res) => {
  if (!req.method === "PATCH") return;

  const session = getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
};

export default handler;
