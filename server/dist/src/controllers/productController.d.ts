import { Request, Response } from "express";
export declare function getProducts(req: Request, res: Response): Promise<void>;
export declare function createProduct(req: Request, res: Response): Promise<void>;
type DeleteProductParams = {
    productId: string;
};
export declare function deleteProduct(req: Request<DeleteProductParams>, res: Response): Promise<void>;
export {};
//# sourceMappingURL=productController.d.ts.map