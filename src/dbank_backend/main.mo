import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300 ;
  currentValue :=200;
//constante que lleva el tiempo
  var startTime = Time.now();

  public func topUp(amount: Float){
    currentValue +=amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawl(amount: Float){
    
      currentValue -=amount;
      Debug.print(debug_show(currentValue));
  };

  public query func checkBalance ():async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS /1000000000;
    currentValue := currentValue *(1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };

}