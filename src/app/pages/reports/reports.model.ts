export class MinimumPurchaseReport {
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    productId: string;

    startDate: string;
    endDate: string;
    sellerId: string;
}

export class ProductVendorWisePurchaseReport {
    categoryId: string;
    subCategoryId: string;
    brandId: string;
    productId: string;

    startDate: string;
    endDate: string;
    sellerId: string;
    vendorId: string;
}

export class MonthData {
    sellerId: string;
    startDateOfMonth: string;
    startDateOfLastMonth: string;
}

