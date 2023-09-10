const getUsersHandler = (req, res) => res.send(`Get users route.`);
const postUsersHandler = (req, res) => res.send(`Post users route.`);
const getSingleUserHandler = (req, res) => res.send(`Get single user route. UserId: ${req.params.userId}`);

module.exports = {
    getUsersHandler,
    postUsersHandler,
    getSingleUserHandler: getSingleUserHandler
}