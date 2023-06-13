const handleApiCall = (request, response) => {
  const raw = JSON.stringify({
    user_app_id: {
      user_id: process.env.USER_ID,
      app_id: process.env.APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: request.body.input,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + process.env.API_KEY,
    },
    body: raw,
  };

  fetch(process.env.FETCH_URL, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      response.json(data);
    })
    .catch((error) => response.status(400).json("Unable to work with API"));
};

const handleImage = (req, res, postgresDB) => {
  const { id } = req.body;

  postgresDB("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((error) => res.status(400).json("Unable to get count"));
};

module.exports = { handleImage, handleApiCall };
