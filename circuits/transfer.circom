pragma circom 2.0.0;
template Transfer(){
 signal input amount;
 signal input to;
 signal output ok;
 ok <== 1;
}
component main = Transfer();
