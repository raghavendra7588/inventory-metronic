export class UpdateMobileNumber {
    emailid: string;
    mobilenumber: string;
}

export class UpdateNewMobileNumber {
    id: string;
    mobilenumber: string;
    newmobilenumber: string;
    userid: string;
}

export class EditUser {
    name: string;
    emailid: string;
    mobilenumber: string;
    password: string;
    address: string;
    pincode: string;
    state: string;
    city: string;
    IsActive: string;
    id: string;
    role: string;
    userid: string;
}


export class SubCategory {
    name: string;
    descriptions: string;
    imageurl: string;
    isparent: string;
    parentid: string;
    id: string;
    isactive: string;
    userid: string;
    parentCategory: string;
}

export class Product {
    varients: any;
    categoryid: string;
    subcategoryid: string;
    brandid: string;
    name: string;
    imgurl: string;
    descriptions: string;
    price: string;
    varient: string;
    measurementUnit: string;
    hotkeyword: string;
    id: string;
    IsActive: string;
    userid: string;
    categoryname: string;
    subcategoryname: string;
    brandname: string;
    MRP: string;
    Discount: string;
    vendorCode: string;
    FinalPrice: string;
    PriceDecisionFactorName: string;
    Quantity: string;
    Unit: string;
    ImageVersion: string;
    mappingid: string;
    brandImageUrl: string;
    outOfStockFlag: string;
    outOfStockMessage: string;
    languageCode: string;
    productDetails: any;
}



export class ProductMeasurementUnit {
    IsActive: string;
    descriptions: string;
    id: string;
    name: string;
    userid: string;
}

export class Category {
    name: string;
    descriptions: string;
    imageurl: string;
    isparent: string;
    parentid: string;
    id: string;
    isactive: string;
    userid: string;
}

export class Brand {
    name: string;
    descriptions: string;
    imageurl: string;
    // isparent: string;
    // parentid: string;
    id: string;
    IsActive: string;
    userid: string;
}

export class ValidateAdminUser {
    address: string;
    city: string;
    emailid: string;
    mobilenumber: string;
    name: string;
    password: string;
    pincode: string;
    state: string;
}

export class EditUpdateAdmin {
    IsActive: string;
    address: string;
    city: string;
    emailid: string;
    id: string;
    mobilenumber: string;
    name: string;
    password: string;
    pincode: string;
    role: string;
    state: string;
    userid: string;
}

export class EditCategory {
    IsActive: string;
    SellerNameCode: string;
    TotalAmount: string;
    TotalCustomer: string;
    TotalOrder: string;
    TotalProductMapped: string;
    TotalSeller: string;
    address: string;
    addresses: string;
    cashYN: string;
    categories: any;
    city: string;
    creditLimit: string;
    creditYN: string;
    customerId: string;
    emailid: string;
    homedelivery: string;
    homedeliverylimit: string;
    id: string;
    menus: string;
    mobilenumber: string;
    name: string;
    newmobilenumber: string;
    onlineYN: string;
    password: string;
    pickup: string;
    pincode: string;
    referenceCode: string;
    role: string;
    state: string;
    token: string;
    userid: string;
    username: string;
    vendorcode: string;
}

export class OrderSalesReport {
    reportType: string;
    sellerName: string;
    startDate: string;
    endDate: string;
    startingDate: string;
    endingDate: string;
}

export class DocumentData {
    userName: string;
    documentType: string;
    userId: string;
    userRole: string;
    file: any;
}

export class SendNotification {
    notificationBody: string;
    notificationTitle: string;
    notifyId: string;
    pincode: string;
    sendusing: string;
    userType: string;
    vendorCode: string;
    vendorCode2: any;
    sellerCode: string;
}

export class SalesEnquiry {
    Address: string;
    Area: string;
    City: string;
    CategoryName: string;
    Date: string;
    IsActive: string;
    Name: string;
    PhoneNo: string;
    Pincode: string;
    ShopKeepersName: string;
    ShopName: string;
    State: string;
    Status: string;
    categories: any;
    categoriestext: string;
    id: string;
    userid: string;
}

export class UnmappedProducts {
    sellerId: string;
    categoryId: string;
    subCategoryId: string;
    brandId: string;
}

export class SaveUnMappedProducts {
    AvailableQuantity: string;
    BrandID: number;
    BrandName: string;
    Discount: string;
    CategoryID: number;
    FinalPrice: string;
    Id: string;
    IsActive: number;
    MRP: string;
    Name: string;
    ProductID: number;
    ProductPrice: string;
    ProductVarientId: number;
    Quantity: string;
    SellerId: number;
    SubCategoryID: number;
    userid: string;
}

export class SaveMappedProducts {
    AvailableQuantity: string;
    BrandID: number;
    BrandName: string;
    Discount: string;
    CategoryID: number;
    FinalPrice: string;
    Id: string;
    IsActive: any;
    MRP: string;
    Name: string;
    ProductID: number;
    ProductPrice: string;
    ProductVarientId: number;
    Quantity: string;
    SellerId: number;
    SubCategoryID: number;
    userid: string;
    OutofStockFlag: boolean;
    OutofStockMsg: string;
}

export class UpdateOutOfStockMessage {

    AvailableQuantity: number;
    BrandID: number;
    BrandName: string;
    Discount: number;
    CategoryID: number;
    FinalPrice: number;
    Id: number;
    IsActive: any;
    MRP: number;
    Name: string;
    OutofStockFlag: any;
    OutofStockMsg: string;
    ProductID: number;
    ProductPrice: number;
    ProductVarientId: number;
    Quantity: string;
    SellerId: number;
    SubCategoryID: number;
    userid: string;
}

export class ParentChildMapping {
    Child_UserID: string;
    Name: string;
    Parent_UserID: string;
    isActive: string;
    isCheckbox: boolean;
    userid: string;
}

