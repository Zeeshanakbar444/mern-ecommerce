import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {categoryController, createCategoryController,singleCategoryController,deleteCategoryController,updateCategoryController } from "../controllers/categoryController.js";
const router  = express.Router();


router.post("/create-category" , requireSignIn , isAdmin , createCategoryController)
router.put("/update-category/:id" , requireSignIn , isAdmin , updateCategoryController)
router.get("/get-category", categoryController)


//get single category
router.get("/single-category/:slug", singleCategoryController)

// delete
router.delete("/delete-category/:id",requireSignIn,isAdmin, deleteCategoryController)


export default router;