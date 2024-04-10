from enum import Enum


class TransactionPaymentChannel(Enum):
    Online = "online"
    InStore = "in store"
    Other = "other"
