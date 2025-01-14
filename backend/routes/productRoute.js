const router =  require("express").Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");


// router.route("/products").get(isAuthenticatedUser , getAllProducts);
router.route("/products").get( getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)
    

module.exports = router