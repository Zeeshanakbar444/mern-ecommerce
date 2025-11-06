import slug from "slug";
import Category from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(402).json({
        success: false,
        message: "name is not found",
      });
    }
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(200).json({
        success: true,
        message: "category already exists",
      });
    }
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).json({
      success: true,
      category,
      message: "new category created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "error in createCategoryController",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in updateCaterory controller",
      error,
      success: false,
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json({
      message: "all category fetch",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error getting all category",
      success: false,
      error,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
     const category = await Category.findOne({slug:req.params.slug});
    res.status(200).json({
        message:"get single category",
        success:true,
        category
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error in single category controller",
      success: false,
      error,
    });
  }
};


export const deleteCategoryController = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findOneAndDelete(id)
        res.status(200).json({
            message:"delete successfully",
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"error in deleteCategoryController",
            success:false,
            error
        })
    }
}