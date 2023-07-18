const axios = require("axios");
const { User } = require("../db");

const URL = "https://backprojectboardgames-production.up.railway.app/";

const getUsers = async () => {
  try {
    const usersApi = await axios.get(`${URL}users`);

    const users = [...new Set(usersApi.data.users)];
    await User.bulkCreate(
      users.map((user) => ({
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        email_verified: user.email_verified,
      }))
    );
  } catch ({ message }) {
    console.error(message);
  }
};

module.exports = {
  getUsers,
};
