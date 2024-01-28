export interface DocumentDTO {
    MESSAGE: {
      $: {
        type: string;
        status: string;
        tentative: boolean;
      };
      HEADER: Header;
      StartSequence: StartSequence;
      FiscalTotalData: FiscalTotalData;
      OriginalSellingInfo: OriginalSellingInfo[];
      FiscalData: FiscalData;
      LineItem: LineItem[];
      DpItemPromo: DpItemPromo[];
      // TransactionDiscount: TransactionDiscount[];
      // PdeCustomer: PdeCustomer[];
      Tender: Tender[];
      Total: Total[];
      DpTransactionPromo: DpTransactionPromo[];

    };
  }
  
  export interface Header {
    Flag: string ;
    BusinessMonthDay: string ;
    RetailStoreID: string ;
    Segment: string ;
    SystemID: string ;
    SequenceNumber: string ;
    TransactionTypeCode: string ;
    WorkstationID: string ;
    BusinessYear: string ;
    TransactionStatus: string ;
  }
   
  export interface  StartSequence {
    OperatorID: string;
    BeginDateTime: string;
    EndDateTime: string;
    BusinessDayDate: string;
    CurrencyCode: string;
    CancelFlag: string;
    TrainingMode: string;
    SuspendFlag: string;
    TransactionTypeCode: string;
    CorrelativoNumber: string;
    CashierName: string;
    VendorName: string;
    VendorId: string;
    NroSeriePos: string;
    Nota: string;
    DespachoDireccion: string;
    DespachoDistrito: string;
    DespachoFecha: string;
    CodigoSucursal: string;
    SolesInDrawer: string;
    DolaresInDrawer: string;
    DolaresExchRate: string;
    ElectronicSerialNumber: string;
    ElectronicCorrelative: string;
    ElectronicFolio: string;
    ElectronicDocumentType: string;
  }
  
  
  export interface FiscalTotalData {
    TaxableAmount: string;
    NonTaxableAmount: string;
    Vat1Amount: string;
    InternalTaxAmount: string;
  }
  
  export interface FiscalData {
    CustomerDocumentType: string ;
    CustomerDocumentNumber: string ;
    CustomerName: string ;
    CustomerPhone: string ;
    InvoiceCustomerId: string;
  }
  export interface OriginalSellingInfo {
    RetailStoreID?: string;
    WorkstationID?: string;
    SequenceNumber?: string;
    BusinessDayDate?: string;
    OriginalElecSerialNumber?: string;
    ReasonCode?: string;
    VerifyCode?: string;
    ValidatedFlag?: string;
    ReceiptFlag?: string;
    ReturnTypeDC?: string;
    OriginalInvoiceCustomerId?: string;
    OriginalElecCorrelative?: string;
    OriginalCashierName?: string;
    OriginalElecFolio?: string;
    OriginalElecDocumentType?: string;
    OriginalCorrelativo?: string;
  }
  
  export interface LineItem {
    EntryMethod: string;
    POSItemID: string;
    Department: string;
    Class: string;
    CategoryCode: string;
    Description: string;
    ExtendedAmount: string;
    Quantity: string;
    ReturnItem: string;
    NonTaxable: string;
    RelativeItemNumber: string;
    VatCode: string;
    InternalTax: string;
    SupervisorOperationMark: string;
    Classification: string;
    Sku: string;
    DespachoDomicilio: string;
    ExtragarantiaChildNumber: string;
    Cod_Despacho: string;
    CodProductoSUNAT: string;
  }
   
  
  export interface DpItemPromo {
    DPPromotionCode: string[];
    DPPromotionDescription: string[];
    DPPromotionAmount: string[];
    RelativeItemNumber: string[];
    DPRewardDepartment: string[];
  }
  
  export interface TransactionDiscount {
    TransactionDiscountReceiptTotal: string[];
  }
  
  export interface PdeCustomer {
    Name: string[];
  }
  
  export interface Tender {
    TenderID: string[];
    AmountDue: string[];
    Amount: string[];
    AccountID: string[];
    AuthAccountNumber: string[];
    ApprovalReference: string[];
    TenderInFlag: string[];
    CardCreditDebit: string[];
    CardInstallments: string[];
    CardDeferred: string[];
    CardValorCuota: string[];
    Convenio00Account: string[];
    Convenio00Cuotas: string[];
    Convenio00MontoCuotas: string[];
    Convenio00CodAutorizacion: string[];
    AuthorizationCode: string[];
    GiftCardAccount:string[];
    CheckBank:string[];
    CheckAccountNumber:string[];
    CheckSerial: string[];
    CheckPlaza: string[];
    VoucherNcDate: string[];
    VoucherNcStore: string[];
    VoucherNcTerminal: string[];
    VoucherNcSequence: string[];
  }
  
  export interface Total {
    TransactionAmount: string[];
    Amount: string[];
    ChangeAmount: string[];
  }
  
  export interface DpTransactionPromo {
    DPPromotionCode: string;
    DPPromotionDescription: string;
    DPPromotionAmount: string;
    DPRewardDepartment: string;
    DPPromoVarId?: string;
    DPPromoVarUpdateValue?: string;
    DPPrintedMessageQuantity?: string;
  }
  

  export interface MessageDTO {
    type: string;
    status: string;
    tentative: boolean;
    header: Header;
    startSequence: StartSequence;
    fiscalTotalData: FiscalTotalData;
    fiscalData: FiscalData;
    lineItems: LineItem[];
    dpItemPromos: DpItemPromo[];
    transactionDiscount: TransactionDiscount;
    pdeCustomer: PdeCustomer;
    tender: Tender;
    total: Total;
  } 
  
