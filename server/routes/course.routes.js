import {Router} from "express";
import { getAllCourses, getLecturesByCourseId } from "../controllers/course.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();


router
    .route('/')
    .get(getAllCourses)
    .post(createCourse)

router
    .route('/:courseId')
    .get(isLoggedIn,getLecturesByCourseId)
    .put(updateCourse)
export default router