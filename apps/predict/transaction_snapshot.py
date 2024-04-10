from typing import Optional
from apps.predict.transaction_code import TransactionCode
from apps.predict.transaction_payment_channel import TransactionPaymentChannel


class TransactionSnapshot:
    def __init__(self):
        self.id: str = ""
        self.snapshot_id: str = ""
        self.external_id: str = ""
        self.external_account_id: str = ""
        # self.location: Location = Location()
        self.primary_category: str = ""
        self.secondary_category: str = ""
        self.confidence_level: str = ""
        self.amount: float = 0.0
        self.iso_currency_code: Optional[str] = None
        self.unofficial_currency_code: Optional[str] = None
        self.check_number: Optional[str] = None
        self.date: str = ""
        self.name: Optional[str] = None
        self.merchant_name: Optional[str] = None
        self.original_description: Optional[str] = None
        self.pending: bool = False
        self.pending_transaction_id: Optional[str] = None
        self.account_owner: Optional[str] = None
        self.logo_url: Optional[str] = None
        self.website: Optional[str] = None
        self.authorized_date: Optional[str] = None
        self.authorized_datetime: Optional[str] = None
        self.datetime: Optional[str] = None
        self.payment_channel: TransactionPaymentChannel = TransactionPaymentChannel()
        self.code: Optional[TransactionCode] = None
        self.category_icon_url: Optional[str] = None
        self.merchant_entity_id: Optional[str] = None
