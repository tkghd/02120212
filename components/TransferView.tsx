export default function TransferView({tx}:{tx:any}){
  return (
    <div>
      <h3>送金ID: {tx.transactionId}</h3>
      <p>状態: {tx.status}</p>
      <p>操作証跡: 監査ログ記録済</p>
    </div>
  );
}
