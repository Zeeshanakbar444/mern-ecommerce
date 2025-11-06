import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteController,
  getProductController,
  updateProductController,
  getSingleProductController,
  productPhotoController,
  realtedProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  productCategoryController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/single-product/:slug", getSingleProductController);
router.get("/product-photo/:pid", productPhotoController);
router.delete("/delete-product/:pid", deleteController);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all product for database

// filter route
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);
//product perpage
router.get("/product-list/:page", productListController);
//serch product
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);
export default router;
