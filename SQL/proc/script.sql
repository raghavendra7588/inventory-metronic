USE [inventory]
GO
/****** Object:  Table [dbo].[Mst_Address]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_Address](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sellerId] [int] NULL,
	[billing_address] [varchar](255) NULL,
	[billing_city] [varchar](255) NULL,
	[billing_pinCode] [varchar](255) NULL,
	[billing_country] [varchar](255) NULL,
	[billing_state] [varchar](255) NULL,
	[billing_phone] [varchar](255) NULL,
	[billing_email] [varchar](255) NULL,
	[shipping_address] [varchar](255) NULL,
	[shipping_city] [varchar](255) NULL,
	[shipping_pinCode] [varchar](255) NULL,
	[shipping_country] [varchar](255) NULL,
	[shipping_state] [varchar](255) NULL,
	[shipping_phone] [varchar](255) NULL,
	[shipping_email] [varchar](255) NULL,
	[sellerName] [varchar](255) NULL,
	[billingName] [varchar](255) NULL,
	[shippingName] [varchar](255) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_Item_Master]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_Item_Master](
	[ItemMasterId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [varchar](255) NULL,
	[UnderGroup] [varchar](255) NULL,
	[BarCode] [varchar](255) NULL,
	[CategoryId] [varchar](255) NULL,
	[SubCategoryId] [varchar](255) NULL,
	[BrandId] [varchar](255) NULL,
	[GstClassification] [varchar](255) NULL,
	[ActiveStatus] [varchar](255) NULL,
	[PurchaseDescription] [varchar](255) NULL,
	[PurchaseMeasurementUnit] [varchar](255) NULL,
	[PurchaseVarient] [varchar](255) NULL,
	[SellingDescription] [varchar](255) NULL,
	[SellingMeasurementUnit] [varchar](255) NULL,
	[SellingVarient] [varchar](255) NULL,
	[ItemType] [varchar](255) NULL,
	[MinimumLevel] [varchar](255) NULL,
	[SerialTracking] [varchar](255) NULL,
	[SellerId] [varchar](255) NULL,
	[PurchasePrice] [money] NULL,
	[PurchaseDiscount] [money] NULL,
	[FinalPurchasePrice] [money] NULL,
	[SellingPrice] [money] NULL,
	[SellingDiscount] [money] NULL,
	[FinalSellingPrice] [money] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_PriceList]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_PriceList](
	[PriceListId] [int] IDENTITY(1,1) NOT NULL,
	[SellerId] [int] NULL,
	[ProductId] [int] NULL,
	[SubCategoryId] [int] NULL,
	[BrandId] [int] NULL,
	[BuyingPrice] [int] NULL,
	[FinalPrice] [int] NULL,
	[ReferenceId] [int] NULL,
	[Discount] [int] NULL,
	[AvailableQuantity] [varchar](255) NULL,
	[Quantity] [varchar](255) NULL,
	[ProductVarientId] [int] NULL,
	[CreatedAt] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_PurchaseOrder]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_PurchaseOrder](
	[PurchaseOrderId] [int] IDENTITY(1,1) NOT NULL,
	[VendorId] [int] NULL,
	[OrderNo] [varchar](255) NULL,
	[OrderDate] [varchar](255) NULL,
	[DeliveryDate] [varchar](255) NULL,
	[ReferenceNo] [varchar](255) NULL,
	[BillingId] [varchar](255) NULL,
	[ShippingId] [varchar](255) NULL,
	[Remarks] [varchar](255) NULL,
	[ItemValue] [varchar](255) NULL,
	[TaxAmount] [varchar](255) NULL,
	[Taxable] [varchar](255) NULL,
	[CESSAmount] [varchar](255) NULL,
	[DocAmount] [varchar](255) NULL,
	[AdvanceAmount] [varchar](255) NULL,
	[AdvanceLedger] [varchar](255) NULL,
	[SellerId] [int] NULL,
	[BatchNumber] [varchar](255) NULL,
	[paymentTerms] [varchar](255) NULL,
	[CreatedAt] [datetime] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_PurchaseOrderItem]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_PurchaseOrderItem](
	[PurchaseOrderItemId] [int] IDENTITY(1,1) NOT NULL,
	[SellerId] [int] NULL,
	[ProductId] [int] NULL,
	[SubCategoryId] [int] NULL,
	[BrandId] [int] NULL,
	[BuyingPrice] [int] NULL,
	[FinalPrice] [int] NULL,
	[ReferenceId] [int] NULL,
	[Discount] [int] NULL,
	[Quantity] [varchar](255) NULL,
	[ProductVarientId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[PurchaseQuantity] [int] NULL,
	[PurchaseOrderId] [int] NULL,
	[StockInCheck] [varchar](255) NULL DEFAULT ('false')
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_StockInItem]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_StockInItem](
	[StockInItemId] [int] IDENTITY(1,1) NOT NULL,
	[PurchaseOrderId] [int] NULL,
	[PurchaseOrderItemId] [int] NULL,
	[CreatedAt] [datetime] NULL,
	[ProductVarientId] [int] NULL,
	[ReferenceId] [int] NULL,
	[QuantityReceived] [int] NULL,
	[Discount] [int] NULL,
	[SellingPrice] [int] NULL,
	[BarCode] [varchar](255) NULL,
	[SellerID] [int] NULL,
	[IsActive] [bit] NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Mst_Vendor]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Mst_Vendor](
	[vendorId] [int] IDENTITY(1,1) NOT NULL,
	[code] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[underLedger] [varchar](255) NULL,
	[contactPerson] [varchar](255) NULL,
	[printName] [varchar](255) NULL,
	[category] [varchar](255) NULL,
	[subCategory] [varchar](255) NULL,
	[brand] [varchar](255) NULL,
	[fileUpload] [varchar](255) NULL,
	[gst] [varchar](255) NULL,
	[gstCategory] [varchar](255) NULL,
	[pan] [varchar](255) NULL,
	[registrationDate] [varchar](255) NULL,
	[distance] [varchar](255) NULL,
	[cin] [varchar](255) NULL,
	[priceCategory] [varchar](255) NULL,
	[agentBroker] [varchar](255) NULL,
	[transporter] [varchar](255) NULL,
	[creditLimit] [varchar](255) NULL,
	[ifscCode] [varchar](255) NULL,
	[accountNumber] [varchar](255) NULL,
	[bankName] [varchar](255) NULL,
	[branch] [varchar](255) NULL,
	[sellerId] [varchar](50) NULL,
	[address] [varchar](255) NULL,
	[city] [varchar](255) NULL,
	[pinCode] [varchar](255) NULL,
	[state] [varchar](255) NULL,
	[country] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[accountName] [varchar](255) NULL,
	[accountType] [varchar](255) NULL,
	[creditLimitDays] [varchar](255) NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  StoredProcedure [dbo].[getAllPriceListData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getAllPriceListData](@SellerId int) AS
BEGIN
Select * from Mst_PriceList where SellerId=@SellerId;
END 
GO
/****** Object:  StoredProcedure [dbo].[GetAllPurchaseOrderItemData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllPurchaseOrderItemData]
	 @PurchaseOrderId int,
	 @VendorId int,
	 @SellerId varchar(255),
	 @OrderNo varchar(255)

	AS
	BEGIN

	select * from Mst_StockInItem where PurchaseOrderItemId IN(
	select PurchaseOrderItemId from Mst_PurchaseOrderItem where PurchaseOrderId=(
	select PurchaseOrderId from Mst_PurchaseOrder where OrderNo=@OrderNo));

	select Mst_PurchaseOrderItem.StockInCheck,Mst_PurchaseOrderItem.PurchaseQuantity,Mst_PurchaseOrderItem.PurchaseOrderItemId,Mst_PurchaseOrderItem.SellerId,
	Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.SubCategoryId,Mst_PurchaseOrderItem.BrandId,
	Mst_PurchaseOrderItem.BuyingPrice,Mst_PurchaseOrderItem.FinalPrice,Mst_PurchaseOrderItem.ReferenceId,
	Mst_PurchaseOrderItem.Discount,Mst_PurchaseOrderItem.Quantity,Mst_PurchaseOrderItem.ProductVarientId,
	Mst_PurchaseOrderItem.CreatedAt,Mst_PurchaseOrderItem.PurchaseQuantity,Mst_PurchaseOrderItem.PurchaseOrderId,Mst_PurchaseOrderItem.BuyingPrice
	from Mst_PurchaseOrderItem,Mst_PurchaseOrder
	where Mst_PurchaseOrderItem.PurchaseOrderId=@PurchaseOrderId
	AND Mst_PurchaseOrder.VendorId=@VendorId 
	AND Mst_PurchaseOrder.SellerId=@SellerId 
	AND Mst_PurchaseOrder.OrderNo=@OrderNo
	AND Mst_PurchaseOrderItem.StockInCheck='false';
	
	END
GO
/****** Object:  StoredProcedure [dbo].[GetPurchaseOrderBySellerId]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetPurchaseOrderBySellerId] 
@VendorId int,
@SellerId varchar(255)

AS
BEGIN
select distinct(Mst_PurchaseOrder.OrderNo),Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.VendorId,
Mst_PurchaseOrder.CreatedAt,Mst_PurchaseOrder.SellerId,
Mst_PurchaseOrder.BatchNumber,Mst_PurchaseOrder.ItemValue
 from Mst_PurchaseOrder
  where Mst_PurchaseOrder.VendorId=@VendorId 
 and  Mst_PurchaseOrder.SellerId=@SellerId 
 and Mst_PurchaseOrder.PurchaseOrderId IN(select Mst_PurchaseOrderItem.PurchaseOrderId from Mst_PurchaseOrderItem where 
 Mst_PurchaseOrderItem.StockInCheck='false');
END
GO
/****** Object:  StoredProcedure [dbo].[getPurchaseReport]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPurchaseReport](
	 @vendorId varchar(50),
	 @orderNo varchar(100),
	 @startDate varchar(50),
	 @endDate varchar(50)
) AS
BEGIN
	SELECT * 
 	FROM Mst_Vendor
	WHERE vendorId = @vendorId;
END 

GO
/****** Object:  StoredProcedure [dbo].[getPurchaseReportById]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getPurchaseReportById](
	 @PurchaseOrderId int
) AS
BEGIN
select ProductId ,'DummyProductName' as ProductName,'DummyBrandName' as BrandName,'DummyName' as Name,BrandId,ProductVarientId,
ReferenceId,BuyingPrice,Discount,FinalPrice,PurchaseQuantity from Mst_PurchaseOrderItem where PurchaseOrderId=@PurchaseOrderId;
END 
GO
/****** Object:  StoredProcedure [dbo].[getPurchaseReportData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getPurchaseReportData](
	 @vendorId varchar(50),
	 @orderNo varchar(100),
	 @startDate varchar(50),
	 @endDate varchar(50),
	 @sellerId varchar(50)
) AS
BEGIN
IF(@vendorId='ALL' AND @orderNo='ALL' AND @startDate ='ALL' AND @endDate='ALL')
BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where Mst_PurchaseOrder.SellerId=@sellerId
	 AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId;
END

ELSE IF(@vendorId!='ALL' AND @orderNo='ALL' AND @startDate ='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int);
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate ='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo;
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate !='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.OrderDate>=@startDate;
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate !='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.OrderDate>=@startDate 
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE IF(@vendorId!='ALL' AND @orderNo!='ALL' AND @startDate ='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int)
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId 
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.orderNo=@orderNo;
END

ELSE IF(@vendorId!='ALL' AND @orderNo='ALL' AND @startDate !='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.OrderDate>=@startDate;
END

ELSE IF(@vendorId!='ALL' AND @orderNo='ALL' AND @startDate ='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.vendorId=CAST(@vendorId as int)
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE IF(@vendorId='ALL' AND @orderNo!='ALL' AND @startDate !='ALL' AND @endDate='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.OrderDate>=@startDate;
END

ELSE IF(@vendorId='ALL' AND @orderNo!='ALL' AND @startDate ='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.orderNo=@orderNo
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE IF(@vendorId='ALL' AND @orderNo='ALL' AND @startDate !='ALL' AND @endDate!='ALL')

BEGIN
	select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,
	Mst_PurchaseOrder.BatchNumber from Mst_Vendor,Mst_PurchaseOrder where 
	Mst_PurchaseOrder.SellerId=CAST(@sellerId as int) 
	AND Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	AND Mst_PurchaseOrder.OrderDate>=@startDate
	AND Mst_PurchaseOrder.DeliveryDate<=@endDate;
END

ELSE
BEGIN
	select 'NODATA';
END

END 

GO
/****** Object:  StoredProcedure [dbo].[getVendorById]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getVendorById](
	 @sellerId varchar(50)
) AS
BEGIN
	SELECT * 
 	FROM Mst_Vendor
	WHERE sellerId = @sellerId;
END 

GO
/****** Object:  StoredProcedure [dbo].[Mst_GetAddressData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetAddressData] (@sellerId int)
AS
BEGIN
 select * from Mst_Address where sellerId=@sellerId;
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_getAllStockInData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_getAllStockInData](@SellerId int) AS
BEGIN
Select * from Mst_StockInItem where SellerId=@SellerId;
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_getAllVendorData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_getAllVendorData] (@SellerId varchar(55)) AS
BEGIN
Select * from Mst_Vendor where SellerId=@SellerId;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_getAllViewVendorData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[Mst_getAllViewVendorData](@vendorId int,@SellerId varchar(50)) AS
BEGIN
select  Mst_PriceList.ProductId as 'ProductName', Mst_PriceList.BrandId as 'BrandName', Mst_PriceList.Quantity,Mst_PriceList.SubCategoryId, Mst_PriceList.ProductVarientId 
from Mst_PriceList,Mst_Vendor
where Mst_PriceList.sellerId=@SellerId
AND Mst_PriceList.SubCategoryId=Mst_Vendor.subCategory
AND Mst_Vendor.vendorId=@vendorId;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetFastestMovingProductsPerMonth]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetFastestMovingProductsPerMonth]
@SellerId varchar(50) 
AS  
BEGIN  
with cte as (select top 5 Mst_PurchaseOrderItem.PurchaseOrderId,Mst_PurchaseOrderItem.PurchaseOrderItemId,SUM(Mst_PurchaseOrderItem.PurchaseQuantity) as 'total'
from Mst_PurchaseOrderItem,Mst_PurchaseOrder
group by Mst_PurchaseOrderItem.PurchaseOrderId,Mst_PurchaseOrder.SellerId,Mst_PurchaseOrderItem.PurchaseOrderItemId
having Mst_PurchaseOrder.SellerId=@SellerId)


select Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.SubCategoryId,Mst_PurchaseOrderItem.BrandId,
 Mst_PurchaseOrderItem.Quantity,
Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,Mst_PurchaseOrderItem.PurchaseQuantity,Mst_PurchaseOrderItem.ProductVarientId,
cte.total,Mst_PurchaseOrderItem.PurchaseOrderItemId
from Mst_PurchaseOrderItem,Mst_PurchaseOrder,
cte where Mst_PurchaseOrderItem.PurchaseOrderItemId =cte.PurchaseOrderItemId


END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetItemMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetItemMaster](@SellerId int)
AS
BEGIN
 select * from Mst_Item_Master where SellerId=@SellerId;
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetMyOrdersData]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetMyOrdersData]
 @VendorCode varchar(50),
 @VendorName varchar(50),
 @OrderDate varchar(50),
 @DeliveryDate varchar(50),
 @SellerId varchar(50),
 @OrderNo varchar(50)
  
AS  
BEGIN  

		DECLARE @sqql nvarchar(max);
	         
		SET @sqql='select Mst_PurchaseProducts.PurchaseProductId,
		Mst_PurchaseProducts.SellerId,
		Mst_PurchaseProducts.DeliveryDate,
		Mst_PurchaseProducts.DeliveryType,
		Mst_PurchaseProducts.PaymentType,
		Mst_PurchaseProducts.DeliveryTime,
		Mst_PurchaseProducts.VendorName,
		Mst_PurchaseProducts.VendorCode,
		Mst_PurchaseProducts.OrderNo,
		Mst_PurchaseProducts.OrderDate
		from Mst_PurchaseProducts
		where Mst_PurchaseProducts.VendorCode= '''+@VendorCode+ '''
		and Mst_PurchaseProducts.SellerId= '''+@SellerId+ ''' 
		and Mst_PurchaseProducts.VendorName='''+@VendorName+''' '


   	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseProducts.OrderDate=  ''' + @OrderDate + ''' '
	END

	IF(@DeliveryDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseProducts.DeliveryDate=  ''' + @DeliveryDate + ''' '
	END

	IF(@OrderNo != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseProducts.OrderNo=  ''' + @OrderNo + ''' '
	END

	Execute SP_EXECUTESQL @sqql
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchaseAmountByMonth]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[Mst_GetPurchaseAmountByMonth](
	 @SellerId varchar(50),
	 @StartDateOfMonth varchar(255)
) AS
BEGIN
	select poi.SellerId as ProductName, poi.SellerId BrandName,
	poi.Quantity as Varient ,poi.BuyingPrice,
	poi.ProductVarientId, poi.ProductId,poi.FinalPrice, 
	poi.Discount,poi.PurchaseQuantity,po.OrderDate,
	po.DeliveryDate,poi.PurchaseOrderItemId,poi.PurchaseOrderId
	from Mst_PurchaseOrderItem poi,Mst_PurchaseOrder po,Mst_Vendor vm
	where po.SellerId=@SellerId
	and poi.PurchaseOrderId=po.PurchaseOrderId
	and vm.vendorId=po.VendorId
	and convert(datetime,po.OrderDate,103)>=@StartDateOfMonth;
END 

GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchaseAmountByMonthByVendor]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetPurchaseAmountByMonthByVendor](
	 @SellerId varchar(50),
	 @StartDateOfMonth varchar(255)
) AS
BEGIN
	select poi.SellerId as ProductName, poi.SellerId BrandName,
	poi.Quantity as Varient ,poi.BuyingPrice,
	poi.ProductVarientId, poi.ProductId,poi.FinalPrice, 
	poi.Discount,poi.PurchaseQuantity,po.OrderDate,
	po.DeliveryDate,poi.PurchaseOrderItemId,poi.PurchaseOrderId,po.VendorId
	from Mst_PurchaseOrderItem poi,Mst_PurchaseOrder po,Mst_Vendor vm
	where po.SellerId=@SellerId
	and poi.PurchaseOrderId=po.PurchaseOrderId
	and vm.vendorId=po.VendorId
	and convert(datetime,po.OrderDate,103)>=@StartDateOfMonth;
END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchaseAmountByWeek]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetPurchaseAmountByWeek](
	 @SellerId varchar(50)
) AS
BEGIN
	DECLARE @CurrentDate varchar(20);
	DECLARE @LastDateOfCurrentWeek varchar(20);

	SET @LastDateOfCurrentWeek= CONVERT(varchar(100), getdate()-7,103);
	SET @CurrentDate=  CONVERT(varchar(100), getdate(),103);

	print @LastDateOfCurrentWeek
	print @CurrentDate

	select poi.SellerId as ProductName, poi.SellerId BrandName,
	poi.Quantity as Varient ,poi.BuyingPrice,
	poi.ProductVarientId, poi.ProductId,poi.FinalPrice, 
	poi.Discount,poi.PurchaseQuantity,po.OrderDate,
	po.DeliveryDate,poi.PurchaseOrderItemId
	from Mst_PurchaseOrderItem poi
	INNER JOIN Mst_PurchaseOrder po ON  po.PurchaseOrderId=poi.PurchaseOrderId
	
	where po.SellerId=@SellerId
	and po.OrderDate between @LastDateOfCurrentWeek and @CurrentDate;
END 

GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchaseAmountByWeekAndVendor]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_GetPurchaseAmountByWeekAndVendor](
	 @SellerId varchar(50)
) AS
BEGIN
	DECLARE @CurrentDate varchar(20);
	DECLARE @LastDateOfCurrentWeek varchar(20);

	SET @LastDateOfCurrentWeek= CONVERT(varchar(100), getdate()-7,103);
	SET @CurrentDate=  CONVERT(varchar(100), getdate(),103);

	print @LastDateOfCurrentWeek
	print @CurrentDate

	select poi.SellerId as ProductName, poi.SellerId BrandName,
	poi.Quantity as Varient ,poi.BuyingPrice,
	poi.ProductVarientId, poi.ProductId,poi.FinalPrice, 
	poi.Discount,poi.PurchaseQuantity,po.OrderDate,
	po.DeliveryDate,poi.PurchaseOrderItemId,po.VendorId
	from Mst_PurchaseOrderItem poi
	INNER JOIN Mst_PurchaseOrder po ON  po.PurchaseOrderId=poi.PurchaseOrderId
	
	where po.SellerId=@SellerId
	and po.OrderDate between @LastDateOfCurrentWeek and @CurrentDate;
END 

GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchaseOrderPerDay]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_GetPurchaseOrderPerDay]
@SellerId varchar(50)

AS  
BEGIN  
DECLARE @currentDate varchar(20);
SET @currentDate =(select convert(varchar, getdate(), 103));

select PurchaseOrderId,OrderNo,OrderDate,DeliveryDate from Mst_PurchaseOrder
where Mst_PurchaseOrder.SellerId= @SellerId
and Mst_PurchaseOrder.OrderDate=@currentDate

END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchaseOrderPerMonth]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetPurchaseOrderPerMonth]
@SellerId varchar(50),  
@OrderDate varchar(50),
@DeliveryDate varchar(50)

AS  
BEGIN  


DECLARE @sqql nvarchar(max);
	         
	SET @sqql='select PurchaseOrderId,OrderNo,OrderDate,DeliveryDate from Mst_PurchaseOrder where Mst_PurchaseOrder.SellerId= '''+@SellerId+ ''' '


	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.OrderDate>=''' + @OrderDate + ''' '
	END

		
	IF(@DeliveryDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.DeliveryDate<=''' + @DeliveryDate + ''' '
	END

	
    Execute SP_EXECUTESQL @sqql


END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchasePerDay]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetPurchasePerDay]
@SellerId varchar(50),  
@OrderDate varchar(50)

AS  
BEGIN  


DECLARE @sqql nvarchar(max);
	         
	SET @sqql='select Mst_PurchaseOrderItem.SellerId as ProductName, Mst_PurchaseOrderItem.SellerId BrandName,Mst_PurchaseOrderItem.Quantity as Varient ,Mst_PurchaseOrderItem.BuyingPrice,
  Mst_PurchaseOrderItem.ProductVarientId, Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.FinalPrice, Mst_PurchaseOrderItem.Discount,
  Mst_PurchaseOrderItem.PurchaseQuantity,Mst_PurchaseOrder.OrderDate from Mst_PurchaseOrderItem, Mst_PurchaseOrder, Mst_Vendor
  where Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId and Mst_PurchaseOrder.SellerId= '''+@SellerId+ ''' '


	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.OrderDate=''' + @OrderDate + ''' '
	END
	
    Execute SP_EXECUTESQL @sqql


END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_GetPurchasePerMonth]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_GetPurchasePerMonth]
@SellerId varchar(50)
AS  
BEGIN  
DECLARE @CurrentDate varchar(20);
DECLARE @LastDate varchar(20);
SET @LastDate= CONVERT(varchar(100), getdate()-30,103)
SET @CurrentDate=  CONVERT(varchar(100), getdate(),103)

select Mst_PurchaseOrderItem.SellerId as ProductName, Mst_PurchaseOrderItem.SellerId BrandName,Mst_PurchaseOrderItem.Quantity as Varient ,Mst_PurchaseOrderItem.BuyingPrice,
Mst_PurchaseOrderItem.ProductVarientId, Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.FinalPrice, Mst_PurchaseOrderItem.Discount,
Mst_PurchaseOrderItem.PurchaseQuantity,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate from Mst_PurchaseOrderItem, Mst_PurchaseOrder, Mst_Vendor
where Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId 
and Mst_PurchaseOrder.SellerId=@SellerId
and Mst_PurchaseOrder.OrderDate between @CurrentDate and @LastDate;
END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_HighestValue_Products_By_Current_Last_Month]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_HighestValue_Products_By_Current_Last_Month](
@SellerId varchar(50),
@startDateOfLastMonth varchar(255),
@CurrentMonthDate varchar(255))
AS  
BEGIN  

declare @tempFinal table(PurchaseOrderItemId int,total int,ProductId int,BrandId int,SubCategoryId int);

DECLARE @TEMPID int;
DECLARE @TEMPTOTAL int;
declare @temp table(PurchaseOrderItemId int,total int,ProductId int,BrandId int,SubCategoryId int);

insert into @temp(PurchaseOrderItemId,total) select top 5 poi.PurchaseOrderItemId,SUM(poi.PurchaseQuantity) as 'Total'
from Mst_PurchaseOrderItem poi
INNER JOIN Mst_PurchaseOrder po ON po.PurchaseOrderId=poi.PurchaseOrderId
group by poi.PurchaseOrderItemId,poi.PurchaseQuantity,po.OrderDate,po.SellerId
having  po.OrderDate between @startDateOfLastMonth and @CurrentMonthDate
and po.SellerId=@SellerId
order by total desc;

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=1
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=2
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=3
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=4
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=5
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select * from @tempFinal;

END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_HighestValue_Products_By_Current_Month]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_HighestValue_Products_By_Current_Month](
@SellerId varchar(50),
@CurrentMonthDate varchar(255))
AS  
BEGIN  

declare @tempFinal table(PurchaseOrderItemId int,total int,ProductId int,BrandId int,SubCategoryId int,Varient varchar(255));

DECLARE @TEMPID int;
DECLARE @TEMPTOTAL int;
declare @temp table(PurchaseOrderItemId int,total int,ProductId int,BrandId int,SubCategoryId int,Varient varchar(255));

insert into @temp(PurchaseOrderItemId,total) select top 5 poi.PurchaseOrderItemId,SUM(poi.PurchaseQuantity) as 'Total'
from Mst_PurchaseOrderItem poi
INNER JOIN Mst_PurchaseOrder po ON po.PurchaseOrderId=poi.PurchaseOrderId
group by poi.PurchaseOrderItemId,poi.PurchaseQuantity,po.OrderDate,po.SellerId
having po.OrderDate>=@CurrentMonthDate
and po.SellerId=@SellerId
order by total desc;

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=1
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total,Varient) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL,Quantity from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=2
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total,Varient) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL,Quantity from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=3
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total,Varient) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL,Quantity from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=4
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total,Varient) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL,Quantity from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select @TEMPID=PurchaseOrderItemId,@TEMPTOTAL=total from (select *,ROW_NUMBER() over (order by total desc) as 'RowNum' from @temp) t where RowNum=5
insert into @tempFinal(BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,total,Varient) 
select top 1 BrandId,SubCategoryId,ProductId,PurchaseOrderItemId,@TEMPTOTAL,Quantity from Mst_PurchaseOrderItem where PurchaseOrderItemId=(
@TEMPID)

select * from @tempFinal;

END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertAddress]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertAddress](
@sellerName VARCHAR(255),
@sellerId int,
@billing_address VARCHAR(255),
@billing_city VARCHAR(255),
@billing_pinCode VARCHAR(255),
@billing_country VARCHAR(255),
@billing_state VARCHAR(255),
@billing_phone VARCHAR(255),
@billing_email VARCHAR(255),
@shipping_address VARCHAR(255),
@shipping_city VARCHAR(255),
@shipping_pinCode VARCHAR(255), 
@shipping_country VARCHAR(255),
@shipping_state VARCHAR(255),
@shipping_phone VARCHAR(255),
@shipping_email VARCHAR(255),
@billingName VARCHAR(255),
@shippingName VARCHAR(255))
AS
BEGIN

	insert into Mst_Address(sellerName,sellerId,billing_address,billing_city,billing_pinCode,billing_country,billing_state,billing_phone,billing_email,shipping_address,shipping_city,shipping_pinCode,shipping_country,
	shipping_state,shipping_phone,shipping_email,billingName,shippingName) VALUES(@sellerName,@sellerId,@billing_address,@billing_city,@billing_pinCode,
	@billing_country,@billing_state,@billing_phone,@billing_email,@shipping_address,@shipping_city,
	@shipping_pinCode,@shipping_country,@shipping_state,@shipping_phone,@shipping_email,@billingName,@shippingName);

END

GO
/****** Object:  StoredProcedure [dbo].[Mst_insertItemMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertItemMaster](
@ProductName VARCHAR(255),
@UnderGroup VARCHAR(255),
@BarCode VARCHAR(255),
@CategoryId VARCHAR(255),
@SubCategoryId VARCHAR(255),
@BrandId VARCHAR(255),
@GstClassification VARCHAR(255),
@ActiveStatus VARCHAR(255),
@PurchaseDescription VARCHAR(255),
@PurchaseMeasurementUnit VARCHAR(255),
@PurchaseVarient VARCHAR(255),
@PurchasePrice money,
@PurchaseDiscount money,
@FinalPurchasePrice money,
@SellingDescription VARCHAR(255),
@SellingMeasurementUnit VARCHAR(255),
@SellingVarient VARCHAR(255),
@SellingPrice money,
@SellingDiscount money,
@FinalSellingPrice money,
@ItemType VARCHAR(255),
@MinimumLevel VARCHAR(255),
@SerialTracking VARCHAR(255),
@SellerId VARCHAR(255)) AS
BEGIN
INSERT INTO Mst_Item_Master(ProductName,UnderGroup,BarCode,CategoryId,SubCategoryId,BrandId,GstClassification,
ActiveStatus,PurchaseDescription,PurchaseMeasurementUnit,
PurchaseVarient,PurchasePrice,PurchaseDiscount,FinalPurchasePrice,SellingDescription,
SellingMeasurementUnit,SellingVarient,SellingPrice,SellingDiscount,FinalSellingPrice,
ItemType,MinimumLevel,
SerialTracking,SellerId)
 VALUES(@ProductName,@UnderGroup,@BarCode,@CategoryId,@SubCategoryId,@BrandId,@GstClassification,
 @ActiveStatus,@PurchaseDescription,
 @PurchaseMeasurementUnit,@PurchaseVarient,
 @PurchasePrice,@PurchaseDiscount,@FinalPurchasePrice,@SellingDescription,@SellingMeasurementUnit,@SellingVarient,
 @SellingPrice,@SellingDiscount,@FinalSellingPrice,@ItemType,
 @MinimumLevel,@SerialTracking,@SellerId);
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPriceListMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_insertPriceListMaster](
@SellerId int,
@ProductId int,
@SubCategoryId int,
@BrandId int,
@BuyingPrice int,
@FinalPrice int,
@ReferenceId int,
@Discount int,
@ProductVarientId int,
@AvailableQuantity varchar(255),
@Quantity varchar(255)
) AS
BEGIN
IF NOT EXISTS (SELECT ProductId FROM Mst_PriceList WHERE ProductId = @ProductId AND ProductVarientId=@ProductVarientId AND SubCategoryId=@SubCategoryId AND BrandId=@BrandId)
BEGIN
INSERT INTO Mst_PriceList(SellerId,ProductId,SubCategoryId,BrandId,BuyingPrice,FinalPrice,ReferenceId,Discount,ProductVarientId,AvailableQuantity,Quantity,CreatedAt) 
VALUES(@SellerId,@ProductId,@SubCategoryId,@BrandId,@BuyingPrice,@FinalPrice,@ReferenceId,@Discount,@ProductVarientId,@AvailableQuantity,@Quantity,GETDATE())
END
ELSE
BEGIN
UPDATE [dbo].[Mst_PriceList]
   SET
      [SellerId] = @SellerId,
      [ProductId] = @ProductId,
      [SubCategoryId] = @SubCategoryId,
      [BrandId] = @BrandId,
      [BuyingPrice] = @BuyingPrice,
      [FinalPrice] = @FinalPrice,
      [ReferenceId] = @ReferenceId,
      [Discount] = @Discount,
	  [ProductVarientId]=@ProductVarientId,
      [AvailableQuantity] = @AvailableQuantity,
      [Quantity] = @Quantity
 WHERE ProductId = @ProductId AND ProductVarientId=@ProductVarientId AND SubCategoryId=@SubCategoryId AND BrandId=@BrandId;
END

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPurchaseOrder]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertPurchaseOrder](
@VendorId VARCHAR(255),
@OrderNo VARCHAR(255),
@OrderDate VARCHAR(255),
@DeliveryDate VARCHAR(255),
@ReferenceNo VARCHAR(255),
@BillingId VARCHAR(255),
@ShippingId VARCHAR(255),
@Remarks VARCHAR(255),
@ItemValue VARCHAR(255),
@TaxAmount VARCHAR(255),
@Taxable VARCHAR(255), 
@CESSAmount VARCHAR(255),
@DocAmount VARCHAR(255),
@AdvanceAmount VARCHAR(255),
@AdvanceLedger VARCHAR(255),
@SellerId int,
@BatchNumber varchar(255),
@paymentTerms varchar(255),
@id int output)
AS
BEGIN

	insert into Mst_PurchaseOrder(VendorId,OrderNo,OrderDate,DeliveryDate,ReferenceNo,BillingId,ShippingId,Remarks,ItemValue,TaxAmount,Taxable,CESSAmount,
	DocAmount,AdvanceAmount,AdvanceLedger,SellerId,BatchNumber,paymentTerms,CreatedAt) VALUES(CAST(@VendorId as INT),@OrderNo,@OrderDate,@DeliveryDate,
	@ReferenceNo,@BillingId,@ShippingId,@Remarks,@ItemValue,@TaxAmount,
	@Taxable,@CESSAmount,@DocAmount,@AdvanceAmount,@AdvanceLedger,@SellerId,@BatchNumber,@paymentTerms,GETDATE())
	SET @id=SCOPE_IDENTITY()
    RETURN  @id

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertPurchaseOrderItem]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertPurchaseOrderItem](
@PurchaseOrderId int,
@SellerId int,
@ProductId int,
@SubCategoryId int,
@BrandId int,
@BuyingPrice int,
@FinalPrice int,
@ReferenceId int,
@Discount int,
@Quantity VARCHAR(255),
@ProductVarientId int,
@PurchaseQuantity int)
AS
BEGIN

	insert into Mst_PurchaseOrderItem(PurchaseOrderId,SellerId,ProductId,SubCategoryId,BrandId,BuyingPrice,FinalPrice,ReferenceId,Discount,Quantity,ProductVarientId,CreatedAt,PurchaseQuantity) VALUES
	(@PurchaseOrderId,@SellerId,@ProductId,@SubCategoryId,@BrandId,@BuyingPrice,
	@FinalPrice,@ReferenceId,@Discount,@Quantity,@ProductVarientId,GETDATE(),@PurchaseQuantity)
END
GO
/****** Object:  StoredProcedure [dbo].[Mst_InsertStockInItems]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_InsertStockInItems] (
	@StockInItemId int,
	@PurchaseOrderId int ,
	@PurchaseOrderItemId int ,
	@ProductVarientId int ,
	@ReferenceId int ,
	@QuantityReceived int ,
	@Discount int ,
	@SellingPrice int ,
	@BarCode varchar(255),
	@SellerId int,
	@IsActive bit
) AS
BEGIN

	IF NOT EXISTS (SELECT StockInItemId FROM Mst_StockInItem WHERE PurchaseOrderId = @PurchaseOrderId AND PurchaseOrderItemId=@PurchaseOrderItemId 
	AND ProductVarientId=@ProductVarientId AND ReferenceId=@ReferenceId)
	BEGIN
	INSERT INTO Mst_StockInItem(PurchaseOrderId,PurchaseOrderItemId,CreatedAt,ProductVarientId,ReferenceId,QuantityReceived,Discount,
	SellingPrice,BarCode,SellerId,IsActive) 
	VALUES(@PurchaseOrderId,@PurchaseOrderItemId,GETDATE(),@ProductVarientId,@ReferenceId,@QuantityReceived,@Discount,
	@SellingPrice,@BarCode,
	@SellerId,@IsActive);
	END

	ELSE
	BEGIN
	UPDATE Mst_StockInItem
   SET
      [PurchaseOrderId] = @PurchaseOrderId,
      [PurchaseOrderItemId] = @PurchaseOrderItemId,
      [ProductVarientId] = @ProductVarientId,
      [ReferenceId] = @ReferenceId,
      [QuantityReceived] = @QuantityReceived,
      [Discount] = @Discount,
      [SellingPrice] = @SellingPrice,
	  [BarCode]=@BarCode,
      [SellerId] = @SellerId,
      [IsActive] = @IsActive
 WHERE StockInItemId = @StockInItemId;
END
IF(@IsActive = 1)
BEGIN
UPDATE Mst_PurchaseOrderItem
SET Mst_PurchaseOrderItem.StockInCheck ='true'
where Mst_PurchaseOrderItem.PurchaseOrderItemId=@PurchaseOrderItemId;
END
	END
GO
/****** Object:  StoredProcedure [dbo].[Mst_insertVendorMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_insertVendorMaster](
@code VARCHAR(255),
@name VARCHAR(255),
@underLedger VARCHAR(255),
@contactPerson VARCHAR(255),
@printName VARCHAR(255),
@category VARCHAR(255),
@subCategory VARCHAR(255),
@brand VARCHAR(255),
@fileUpload VARCHAR(255),
@gst VARCHAR(255),
@gstCategory VARCHAR(255),
@pan VARCHAR(255),
@registrationDate VARCHAR(255),
@distance VARCHAR(255),
@cin VARCHAR(255),
@priceCategory VARCHAR(255),
@agentBroker VARCHAR(255),
@transporter VARCHAR(255),
@creditLimit VARCHAR(255),
@ifscCode VARCHAR(255),
@accountNumber VARCHAR(255),
@bankName VARCHAR(255),
@branch VARCHAR(255),
@sellerId VARCHAR(50),
@address VARCHAR(255),
@city VARCHAR(255),
@pinCode VARCHAR(255),
@state VARCHAR(255),
@country VARCHAR(255),
@phone VARCHAR(255),
@email VARCHAR(255),
@accountName VARCHAR(255),
@accountType VARCHAR(255),
@creditLimitDays VARCHAR(255)) AS
BEGIN

DECLARE @SepratedValue varchar(255);
DECLARE @InputCode varchar(255);
DECLARE @CodeValue int;
DECLARE @CodeValueLen int;
DECLARE @FinalCode varchar(255);


SET @InputCode =(SELECT TOP 1 code FROM Mst_Vendor ORDER BY vendorId DESC);

SET @CodeValue=(SELECT y = CAST(SUBSTRING(@InputCode, 4,LEN(@InputCode))AS INT));
SET @CodeValue=@CodeValue+1;
SET @CodeValueLen=LEN(@CodeValue);
IF(@CodeValueLen = 1)
BEGIN
SET @FinalCode='GVV0000'+CAST(@CodeValue as varchar(255))
END

IF(@CodeValueLen = 2)
BEGIN
SET @FinalCode='GVV000'+CAST(@CodeValue as varchar(255))
END

IF(@CodeValueLen = 3)
BEGIN
SET @FinalCode='GVV00'+CAST(@CodeValue as varchar(255))
END

IF(@CodeValueLen = 4)
BEGIN
SET @FinalCode='GVV0'+CAST(@CodeValue as varchar(255))
END

IF(@CodeValueLen = 5)
BEGIN
SET @FinalCode='GVV'+CAST(@CodeValue as varchar(255))
END

 

INSERT INTO Mst_Vendor(code,name,underLedger,contactPerson,printName,category,subCategory,brand,fileUpload,gst,gstCategory,pan,registrationDate,distance,cin,priceCategory,agentBroker,transporter,creditLimit,ifscCode,accountNumber,bankName,branch,sellerId,address,city,pinCode,state,country,phone,email,accountName,accountType,creditLimitDays)
 VALUES(@FinalCode,@name,@underLedger,@contactPerson,@printName,@category,@subCategory,@brand,@fileUpload,@gst,@gstCategory,@pan,@registrationDate,@distance,@cin,@priceCategory,@agentBroker,@transporter,@creditLimit,@ifscCode,@accountNumber,@bankName,@branch,@sellerId,@address,@city,@pinCode,@state,@country,@phone,@email,@accountName,@accountType,@creditLimitDays);

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_Minimum_Purchase_Report]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_Minimum_Purchase_Report]
@SellerId varchar(50),  
@SubCategoryId varchar(50),
@BrandId varchar(50),
@ProductId varchar(50),
@OrderDate varchar(50),
@DeliveryDate varchar(50)
  
AS  
BEGIN  

DECLARE @sqql nvarchar(max);
	         
	SET @sqql='select Mst_PurchaseOrderItem.SubCategoryId as ProductName, Mst_PurchaseOrderItem.BrandId BrandName,Mst_PurchaseOrderItem.Quantity as Varient ,
	Mst_PurchaseOrderItem.BuyingPrice,
  Mst_PurchaseOrderItem.ProductVarientId, Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.FinalPrice, Mst_PurchaseOrderItem.Discount,
  Mst_PurchaseOrder.OrderDate,Mst_Vendor.name,Mst_PurchaseOrder.OrderNo,
  Mst_PurchaseOrderItem.PurchaseQuantity from Mst_PurchaseOrderItem, Mst_PurchaseOrder, Mst_Vendor
  where Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId 
  and Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
  and Mst_PurchaseOrder.SellerId= '''+@SellerId+ ''' '


   	IF(@SubCategoryId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.SubCategoryId=  ''' + @SubCategoryId + ''' '
	END

	IF(@BrandId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.BrandId=  ''' + @BrandId + ''' '
	END

	IF(@ProductId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.ProductId=  ''' + @ProductId + ''' '
	END

	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.OrderDate>=''' + @OrderDate + ''' '
	END
	
	IF(@DeliveryDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.DeliveryDate<=''' + @DeliveryDate + ''' '
	END




    Execute SP_EXECUTESQL @sqql

select ProductVarientId,Min(BuyingPrice) as 'MinBuying',Min(Discount) as 'MinDiscount' from Mst_PurchaseOrderItem,Mst_PurchaseOrder
where Mst_PurchaseOrder.SellerId=@SellerId
group by ProductVarientId,BuyingPrice,Discount;

END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_purchaseOrderMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_purchaseOrderMaster](
	@PurchaseOrderId INT,
	@VendorId varchar(255) ,
	@OrderNo varchar(255) ,
	@OrderDate varchar(255) ,
	@DeliveryDate varchar(255) ,
	@ReferenceNo varchar(255) ,
	@BillingId varchar(255) ,
	@ShippingId varchar(255) ,
	@Remarks varchar(255) ,
	@ItemValue varchar(255) ,
	@TaxAmount varchar(255) ,
	@Taxable varchar(255) ,
	@CESSAmount varchar(255) ,
	@DocAmount varchar(255) ,
	@AdvanceAmount varchar(255) ,
	@AdvanceLedger varchar(255),
	@SellerId INT
) AS
BEGIN
UPDATE [dbo].[Mst_PurchaseOrder]
   SET [VendorId]=@VendorId,
	[OrderNo]=@OrderNo,
	[OrderDate]=@OrderDate,
	[DeliveryDate]=@DeliveryDate,
	[ReferenceNo]=@ReferenceNo,
	[BillingId]=@BillingId,
	[ShippingId]=@ShippingId,
	[Remarks]=@Remarks,
	[ItemValue]=@ItemValue,
	[Taxable]=@Taxable,
	[TaxAmount]=@TaxAmount,
	[CESSAmount]=@CESSAmount,
	[DocAmount]=@DocAmount,
	[AdvanceAmount]=@AdvanceAmount,
	[AdvanceLedger]=@AdvanceLedger,
	[SellerId]=@SellerId

 WHERE PurchaseOrderId=@PurchaseOrderId;

END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_PurchaseReport_Product_Wise_DATA]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PurchaseReport_Product_Wise_DATA]  
@SellerId varchar(50),  
@SubCategoryId varchar(50),
@BrandId varchar(50),
@ProductId varchar(50),
@OrderDate varchar(50),
@DeliveryDate varchar(50)
  
AS  
BEGIN  


DECLARE @sqql nvarchar(max);
	         
	SET @sqql='select Mst_PurchaseOrderItem.SellerId as ProductName, Mst_PurchaseOrderItem.SellerId BrandName,Mst_PurchaseOrderItem.Quantity as Varient,
	Mst_PurchaseOrderItem.BuyingPrice,
  Mst_PurchaseOrderItem.ProductVarientId, Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.FinalPrice, Mst_PurchaseOrderItem.Discount,
  Mst_PurchaseOrderItem.PurchaseQuantity from Mst_PurchaseOrderItem, Mst_PurchaseOrder, Mst_Vendor
  where Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId 
  and Mst_PurchaseOrder.vendorId =Mst_Vendor.vendorId
  and Mst_PurchaseOrder.SellerId= '''+@SellerId+ ''' '

   	IF(@SubCategoryId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.SubCategoryId=  ''' + @SubCategoryId + ''' '
	END

	IF(@BrandId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.BrandId=  ''' + @BrandId + ''' '
	END

	IF(@ProductId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.ProductId=  ''' + @ProductId + ''' '
	END

	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.OrderDate>=''' + @OrderDate + ''' '
	END
	
	IF(@DeliveryDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.DeliveryDate<=''' + @DeliveryDate + ''' '
	END

    Execute SP_EXECUTESQL @sqql

END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_PurchaseReport_Vendor_Order_Wise_DATA]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_PurchaseReport_Vendor_Order_Wise_DATA]  
@SellerId varchar(50),  
@vendorId varchar(50),
@orderNO varchar(50),
@OrderDate varchar(50),
@DeliveryDate varchar(50)
  
AS  
BEGIN  

	
	DECLARE @sqql nvarchar(max);

	SET @sqql='select Mst_Vendor.name as vendor_name,Mst_PurchaseOrder.PurchaseOrderId,
	FORMAT(Mst_PurchaseOrder.CreatedAt,''dd/MM/yyyy HH:mm:ss'') as CreatedAt,
	Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.OrderDate,Mst_PurchaseOrder.DeliveryDate,Mst_PurchaseOrder.BatchNumber from Mst_Vendor,
	Mst_PurchaseOrder where Mst_PurchaseOrder.vendorId=Mst_Vendor.vendorId and Mst_PurchaseOrder.SellerId=''' + @SellerId + '''  '
	



	IF(@vendorId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.vendorId= '''+ @vendorId + ''''
	END



	IF(@orderNO != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.orderNo= '''+ @orderNO + ''''
	END



	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.OrderDate>= '''+ @OrderDate + ''''
	END


	IF(@DeliveryDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.DeliveryDate<= '''+ @DeliveryDate + ''''
	END

	SET @sqql=@sqql+'   order by CreatedAt desc'
	Execute SP_EXECUTESQL @sqql
END  
GO
/****** Object:  StoredProcedure [dbo].[Mst_updateAddressMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_updateAddressMaster](
	@id INT,
	@sellerId INT,
	@billing_address varchar(255) ,
	@billing_city varchar(255) ,
	@billing_pinCode varchar(255) ,
	@billing_country varchar(255) ,
	@billing_state varchar(255) ,
	@billing_phone varchar(255) ,
	@billing_email varchar(255) ,
	@shipping_address varchar(255) ,
	@shipping_city varchar(255) ,
	@shipping_pinCode varchar(255) ,
	@shipping_country varchar(255) ,
	@shipping_state varchar(255) ,
	@shipping_phone varchar(255) ,
	@shipping_email varchar(255) ,
	@sellerName varchar(255) ,
	@billingName varchar(255),
	@shippingName varchar(255)
) AS
BEGIN
UPDATE [dbo].[Mst_Address]
   SET [sellerId]=@sellerId,
	[billing_address]=@billing_address,
	[billing_city]=@billing_city,
	[billing_pinCode]=@billing_pinCode,
	[billing_country]=@billing_country,
	[billing_state]=@billing_state,
	[billing_phone]=@billing_phone,
	[billing_email]=@billing_email,
	[shipping_address]=@shipping_address,
	[shipping_city]=@shipping_city,
	[shipping_pinCode]=@shipping_pinCode,
	[shipping_country]=@shipping_country,
	[shipping_state]=@shipping_state,
	[shipping_phone]=@shipping_phone,
	[shipping_email]=@shipping_email,
	[sellerName]=@sellerName,
	[billingName]=@billingName,
	[shippingName]=@shippingName
 WHERE id=@id;

END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_updateItemMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_updateItemMaster](
	@ItemMasterId INT,
	@ProductName varchar(255) ,
	@UnderGroup varchar(255) ,
	@BarCode varchar(255) ,
	@CategoryId varchar(255) ,
	@SubCategoryId varchar(255) ,
	@BrandId varchar(255) ,
	@GstClassification varchar(255) ,
	@ActiveStatus varchar(255) ,
	@PurchaseDescription varchar(255) ,
	@PurchaseMeasurementUnit varchar(255) ,
	@PurchaseVarient varchar(255) ,
	@PurchasePrice money,
	@PurchaseDiscount money,
	@FinalPurchasePrice money ,
	@SellingDescription varchar(255),
	@SellingMeasurementUnit varchar(255),
	@SellingVarient varchar(255),
	@SellingPrice money,
	@SellingDiscount money,
	@FinalSellingPrice money,
	@ItemType varchar(255) ,
	@MinimumLevel varchar(255) ,
	@SerialTracking varchar(255),
	@SellerId varchar(255) 
) AS
BEGIN
UPDATE [dbo].[Mst_Item_Master]
   SET [ProductName]=@ProductName,
	[UnderGroup]=@UnderGroup,
	[BarCode]=@BarCode,
	[CategoryId]=@CategoryId,
	[SubCategoryId]=@SubCategoryId,
	[BrandId]=@BrandId,
	[GstClassification]=@GstClassification,
	[ActiveStatus]=@ActiveStatus,
	[PurchaseDescription]=@PurchaseDescription,
	[PurchaseMeasurementUnit]=@PurchaseMeasurementUnit,
	[PurchaseVarient]=@PurchaseVarient,
	[PurchasePrice]=@PurchasePrice,
	[PurchaseDiscount]=@PurchaseDiscount,
	[FinalPurchasePrice]=@FinalPurchasePrice,
	[SellingDescription]=@SellingDescription,
	[SellingMeasurementUnit]=@SellingMeasurementUnit,
	[SellingVarient]=@SellingVarient,
	[SellingPrice]=@SellingPrice,
	[SellingDiscount]=@SellingDiscount,
	[FinalSellingPrice]=@FinalSellingPrice,
	[ItemType]=@ItemType,
	[MinimumLevel]=@MinimumLevel,
	[SerialTracking]=@SerialTracking,
	[SellerId]=@SellerId
 WHERE ItemMasterId=@ItemMasterId;

END
GO
/****** Object:  StoredProcedure [dbo].[Mst_updatePriceListMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Mst_updatePriceListMaster](
@PriceListId int,
@SellerId int,
@ProductId int,
@SubCategoryId int,
@BrandId int,
@BuyingPrice int,
@FinalPrice int,
@ReferenceId int,
@Discount int,
@ProductVarientId int,
@AvailableQuantity varchar(255),
@Quantity varchar(255)
) AS
BEGIN
UPDATE [dbo].[Mst_PriceList]
   SET
      [SellerId] = @SellerId,
      [ProductId] = @ProductId,
      [SubCategoryId] = @SubCategoryId,
      [BrandId] = @BrandId,
      [BuyingPrice] = @BuyingPrice,
      [FinalPrice] = @FinalPrice,
      [ReferenceId] = @ReferenceId,
      [Discount] = @Discount,
	  [ProductVarientId]=@ProductVarientId,
      [AvailableQuantity] = @AvailableQuantity,
      [Quantity] = @Quantity
 WHERE PriceListId=@PriceListId;

END 
GO
/****** Object:  StoredProcedure [dbo].[Mst_updateVendorMaster]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Mst_updateVendorMaster](
@code VARCHAR(255),
@name VARCHAR(255),
@underLedger VARCHAR(255),
@contactPerson VARCHAR(255),
@printName VARCHAR(255),
@category VARCHAR(255),
@subCategory VARCHAR(255),
@brand VARCHAR(255),
@fileUpload VARCHAR(255),
@gst VARCHAR(255),
@gstCategory VARCHAR(255),
@pan VARCHAR(255),
@registrationDate VARCHAR(255),
@distance VARCHAR(255),
@cin VARCHAR(255),
@priceCategory VARCHAR(255),
@agentBroker VARCHAR(255),
@transporter VARCHAR(255),
@creditLimit VARCHAR(255),
@ifscCode VARCHAR(255),
@accountNumber VARCHAR(255),
@bankName VARCHAR(255),
@branch VARCHAR(255),
@vendorId INT,
@sellerId VARCHAR(50),
@address VARCHAR(255),
@city VARCHAR(255),
@pinCode VARCHAR(255),
@state VARCHAR(255),
@country VARCHAR(255),
@phone VARCHAR(255),
@email VARCHAR(255),
@accountName VARCHAR(255),
@accountType VARCHAR(255),
@creditLimitDays VARCHAR(255)
) AS
BEGIN
UPDATE [dbo].[Mst_Vendor]
   SET [code] = @code,
      [name] = @name,
      [underLedger] = @underLedger,
      [contactPerson] = @contactPerson,
      [printName] = @printName,
      [category] = @category,
      [subCategory] = @subCategory,
      [brand] = @brand,
      [fileUpload] = @fileUpload,
      [gst] = @gst,
      [gstCategory] = @gstCategory,
      [pan] = @pan,
      [registrationDate] = @registrationDate,
      [distance] = @distance,
      [cin] = @cin,  
      [priceCategory] = @priceCategory,
      [agentBroker] = @agentBroker,
      [transporter] = @transporter,
      [creditLimit] = @creditLimit,
      [ifscCode] = @ifscCode,
      [accountNumber] = @accountNumber,
      [bankName] = @bankName,
      [branch] = @branch,
	  [sellerId] =@sellerId,
	  [address]=@address,
	  [city]=@city,
	  [pinCode]=@pinCode,
	  [state]=@state,
	  [country]=@country,
	  [phone]=@phone,
	  [email]=@email,
	  [accountName]=@accountName,
	  [accountType]=@accountType,
	  [creditLimitDays]=@creditLimitDays
 WHERE vendorId=@vendorId;

END
GO
/****** Object:  StoredProcedure [dbo].[ProductVendor_Wise_Purchase_Report]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductVendor_Wise_Purchase_Report]
 @SellerId varchar(50),
 @SubCategoryId varchar(50),
 @BrandId varchar(50),
 @ProductId varchar(50),
 @OrderDate varchar(50),
 @DeliveryDate varchar(50),
 @VendorId varchar(50)
  
AS  
BEGIN  



    DECLARE @sqql nvarchar(max);
	         
		SET @sqql='select Mst_PurchaseOrderItem.SubCategoryId as ProductName, Mst_PurchaseOrderItem.BrandId as BrandName, Mst_PurchaseOrderItem.BrandId as BrandID ,Mst_PurchaseOrderItem.Quantity as Varient ,
		Mst_PurchaseOrderItem.BuyingPrice,
	  Mst_PurchaseOrderItem.ProductVarientId, Mst_PurchaseOrderItem.ProductId,Mst_PurchaseOrderItem.FinalPrice, Mst_PurchaseOrderItem.Discount,
	  Mst_PurchaseOrder.OrderDate,Mst_Vendor.name,Mst_PurchaseOrder.OrderNo,Mst_PurchaseOrder.VendorId,
	  Mst_PurchaseOrderItem.PurchaseQuantity from Mst_PurchaseOrderItem, Mst_PurchaseOrder, Mst_Vendor
	  where Mst_PurchaseOrder.PurchaseOrderId = Mst_PurchaseOrderItem.PurchaseOrderId 
	  and Mst_PurchaseOrder.VendorId=Mst_Vendor.vendorId
	  and Mst_PurchaseOrder.SellerId= '''+@SellerId+ ''' '

   

   	IF(@SubCategoryId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.SubCategoryId=  ''' + @SubCategoryId + ''' '
	END

	IF(@BrandId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.BrandId=  ''' + @BrandId + ''' '
	END

	IF(@ProductId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrderItem.ProductId=  ''' + @ProductId + ''' '
	END

	IF(@OrderDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.OrderDate>=''' + @OrderDate + ''' '
	END
	
	IF(@DeliveryDate != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.DeliveryDate<=''' + @DeliveryDate + ''' '
	END
	
	IF(@VendorId != 'ALL')
	BEGIN
	SET @sqql=@sqql + 'and Mst_PurchaseOrder.VendorId=''' + @VendorId + ''' '
	END

	Execute SP_EXECUTESQL @sqql
END  
GO
/****** Object:  StoredProcedure [dbo].[Vendor_Mapped_Data]    Script Date: 02-02-2021 23:25:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Vendor_Mapped_Data] 
@SellerId varchar(50),  
@vendorId int
AS  
BEGIN  
	DECLARE @sql nvarchar(max);
	DECLARE @BRANDID nvarchar(max);
	DECLARE @SUBCATEGORYID nvarchar(max);

SET @BRANDID = (select brand from Mst_Vendor where vendorId=CAST(@vendorId as varchar(255)));
SET @SUBCATEGORYID=(select subCategory from Mst_Vendor where vendorId=CAST(@vendorId as varchar(255)));

         
SET @sql='select Mst_PriceList.ProductId,Mst_PriceList.SubCategoryId as ''Category'',Mst_PriceList.SubCategoryId as ''SubCategory'',Mst_PriceList.ProductId as ''ProductName'', Mst_PriceList.BrandId as ''BrandName'', 
Mst_PriceList.Quantity, Mst_PriceList.ProductVarientId,Mst_PriceList.ReferenceId,Mst_Vendor.name 
from Mst_PriceList,Mst_Vendor
where Mst_PriceList.sellerId='''+@SellerId+ ''' ' 



IF(@vendorId > 0)
	BEGIN
	SET @sql=@sql + 'and  Mst_PriceList.BrandId IN('+ @BRANDID +')'
	END
IF(@vendorId > 0)
	BEGIN
	SET @sql=@sql + 'and Mst_Vendor.vendorId=' + CAST(@vendorId AS NVARCHAR(50))
	END
IF(@vendorId > 0)
	BEGIN
	SET @sql=@sql + 'and Mst_PriceList.SubCategoryId IN ('+@SUBCATEGORYID+')'
	END


Execute SP_EXECUTESQL @sql
	
END  
GO
