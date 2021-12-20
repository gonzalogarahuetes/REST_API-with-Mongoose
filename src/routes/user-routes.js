const Router = require("express").Router;
const { authMiddleware } = require("../middleware");
const UserController = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.use("/", authMiddleware);

UserRouter.post("/sign-up", UserController.signUp);

UserRouter.get("/users", UserController.getAllUsers);

UserRouter.get("/users/:userId", UserController.getSingleUser);

UserRouter.post("/users", UserController.createUser);

UserRouter.patch("/users/:userId", UserController.updateUser);

UserRouter.delete("/users/:userId", UserController.deleteUser);

module.exports = UserRouter;
