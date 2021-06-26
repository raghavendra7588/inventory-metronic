export class PaymentGateWay {
    Name: string;
    EmailID: string;
    Amount: string;
    mobilno: string;
    TransationID: string;
    currentPaymentMode: string;
}

export class ActivityStatusChange {
    paymentMode: string;
    paymentDate: string;
    expiryDate: string;
    InactiveReason: string;
    inActivatedDate: string;
    sellerId: string;
    CurrentStatus: string;
    updatedExpiryDate: string;
}

export class ActiveStatus {
    updatedExpiryDate: string;
    CurrentStatus: string;
    sellerId: string;
    InactiveReason: string;
    inActivatedDate: string;
}

export class PaymentSuccessAndFailure {
    SellerId: string;
    TrasnsactionId: string;
    Amount: string;
    CurrentStatus: string;
    NewExpiryDate: string;
    PaymentId: number;
    VendorCode: string;
    VendorName: string;
    SubscritpionStartDate: string;
    CurrentPaymentMode: string;
}

export class PreviousTrasactions {
    SellerId: Number;
    CurrentDate: string;
}

export class AdminSellerActiveInActive {
    id: string;
    Vendorcode: string;
    tempInActiveFlag: string;
    tempInActiveMsg: string;
}