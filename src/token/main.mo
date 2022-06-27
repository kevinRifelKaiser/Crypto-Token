import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    
    //Principal ID
    var owner: Principal = Principal.fromText("7zd46-z6lp4-gurpi-2z7vs-27ylw-w4d7x-p2cau-q2lh7-nykq6-dljv5-eqe");
    var totalSupply : Nat = 1000000000;
    var symbol: Text = "DIPO";

    //Hash Map
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        if(balances.get(msg.caller) == null) {
            let amount = 10000;
            balances.put(msg.caller, amount);
            return "Success";
        } else {
            return "Already claimed";
        }
        
    };



};