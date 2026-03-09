"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getProducts(req, res) {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.products.findMany({
            where: search
                ? {
                    name: {
                        contains: search,
                    },
                }
                : {},
        });
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({
            message: "Error retrieving products",
        });
    }
}
async function createProduct(req, res) {
    try {
        const productData = req.body;
        if (!productData) {
            res.status(400).json({ message: "Missing product data" });
            return;
        }
        const { productId, name, price, rating, stockQuantity } = productData;
        if (typeof productId !== "string" ||
            typeof name !== "string" ||
            typeof price !== "number" ||
            typeof rating !== "number" ||
            typeof stockQuantity !== "number") {
            res.status(400).json({ message: "Invalid data types" });
            return;
        }
        const product = await prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            },
        });
        res.status(201).json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
async function deleteProduct(req, res) {
    try {
        const { productId } = req.params;
        if (!productId) {
            res.status(400).json({
                message: "Missing data",
            });
            return;
        }
        await prisma.products.delete({
            where: { productId },
        });
        res.status(204).send();
    }
    catch (err) {
        res.status(404).json({
            message: "Product not found",
        });
        return;
    }
    res.status(500).json({
        message: "Something is wrong. Cannot perform action",
    });
}
//# sourceMappingURL=productController.js.map