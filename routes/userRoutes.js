import express from "express";
import {
  userLoginSuccess,
  userRegister,
  userlogin,
  getAllHires,
  updateUser,
  getAllTasks,
  updateTask,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userlogin);

router.get("/me", userLoginSuccess);

router.get("/", getAllHires);

router.put("/:id", updateUser);

router.get("/get_tasks/:id", getAllTasks);

router.post("/update_task", updateTask);

export default router;
