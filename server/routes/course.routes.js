import { Router } from "express";
import {
  addLecturesToCourseById,
  createCourse,
  deleteCourse,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
} from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(isLoggedIn,authorizedRoles("ADMIN"),upload.single("thumbnail"), createCourse);

router
  .route("/:courseId")
  .get(isLoggedIn, getLecturesByCourseId)
  .put(isLoggedIn,authorizedRoles,updateCourse)
  .delete(isLoggedIn,authorizedRoles,deleteCourse)
  .post(isLoggedIn,authorizedRoles,
    upload.single('thumbnail'),
    addLecturesToCourseById
  );

export default router;
