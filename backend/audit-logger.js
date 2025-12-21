export class AuditLogger {
  static log(event, data) {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      userId: data.user?.id,
      ip: data.ip,
      userAgent: data.userAgent
    };
    
    console.log('[AUDIT]', JSON.stringify(auditEntry));
    
    // 本番では外部ログサービスに送信
    // await sendToLogService(auditEntry);
  }
  
  static async logTransfer(transfer) {
    this.log('TRANSFER', {
      transactionId: transfer.transactionId,
      bank: transfer.bank,
      amount: transfer.amount,
      from: transfer.from,
      to: transfer.to,
      status: transfer.status
    });
  }
  
  static async logAuth(user, action) {
    this.log('AUTH', {
      userId: user.id,
      email: user.email,
      action,
      timestamp: new Date().toISOString()
    });
  }
}
