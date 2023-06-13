const handleProfile = (req, res, postgresDB) => {
  const { id } = req.params;

  postgresDB
    .select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch((error) => res.status(400).json("Error getting user"));
};

module.exports = { handleProfile: handleProfile };
