
class TicketDTO {
  constructor({ code, purchase_datetime, orderId, amount, purchaser}) {
      this.code = code,
      this.purchase_datetime = purchase_datetime;
      this.orderId = orderId;
      this.amount = amount;
      this.purchaser = purchaser;

  }

}

export default TicketDTO;
