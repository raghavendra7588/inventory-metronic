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
    parentCategory: string;
    name: string;
    description: string;
    image: any;
}

export class Product {
    name: string;
    description: string;
}

export class InsertUpdateCategory {
    name: string;
    descriptions: string;
    imageurl: string;
    isparent: string;
    parentid: string;
    id: string;
    isactive: string;
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