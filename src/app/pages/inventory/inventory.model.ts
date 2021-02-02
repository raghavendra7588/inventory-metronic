export class PurchaseReport {
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    productId: string;
    startDate: string;
    endDate: string;
    sellerId: string;
}

export class SalesReport {
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    startDate: string;
    endDate: string;
}

export class ItemMaster {
    itemMasterId?: number;
    productName?: string;
    underGroup?: string;
    barCode?: any;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    gstClassification?: string;
    activeStatus?: string;
    purchaseDescription?: string;
    purchaseMeasureMentUnit?: string;
    purchaseVarient?: string;
    purchasePrice?: string;
    purchaseDiscount?: string;
    finalPurchasePrice?: string;
    sellingDescription?: string;
    sellingMeasurementUnit?: string;
    sellingVarient?: string;
    sellingPrice?: string;
    sellingDiscount?: string;
    finalSellingPrice?: string;
    itemType?: string;
    minimumLevel?: string;
    serialTracking?: string;
    sellerId?: string;
}

export class StockIn {
    PurchaseOrderId: number;
    PurchaseOrderItemId: number;
    ProductVarientId: number;
    ReferenceId: number;
    QuantityReceived: number;
    QuantityOrdered: number;
    Discount: number;
    SellingPrice: number;
    BarCode: string;
    sellerId: number;
    stockInItemId: number;
}