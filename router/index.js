import express from "express";
import UserControlller from "../controller/UserControlller.js";
import AuthController from "../controller/AuthController.js";
import helper from "../utility/helper.js";
import CmsController from "../controller/CmsController.js";
import DepartmentController from "../controller/DepartmentController.js";

const router = express.Router();

router.post("/fileuploe", helper.uploadFile);

router.use(helper.asyncMiddleware);
router.post("/UserCreate", UserControlller.UserCreate);
router.get("/findUser", UserControlller.findUser);

//<---------------------auth------------------------------------------------------------>
//<---------------------key valediction -------------------------------------------------->

router.post("/login", AuthController.login);

//<---------------------------token valediction ------------------------------------------->
router.use(helper.authenticateToken);
router.post("/logout", AuthController.logout);
router.get("/UserProfile", AuthController.UserProfile);
router.post("/changePassword", AuthController.ChangePassword);

//<----------------------------Deparment ---------------------------------------------------------->
router.post("/departmentCreate", DepartmentController.departmentCreate);
router.get("/departmentFindAll", DepartmentController.departmentFindAll);
router.get("/departmentFindById/:id", DepartmentController.departmentFindById);
router.put("/departmentUpdate/:id", DepartmentController.departmentUpdate);
router.delete("/departmentDelete/:id", DepartmentController.departmentDelete);

//<------------------------------Cms------------------------------------------------------>
router.post("/cmscreate", CmsController.cmsCreate);
router.get("/cmsget", CmsController.CmsGet);
router.post("/CmsUpdate", CmsController.CmsUpdate);



export default router;
