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
        // Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null) {
            let amount = 10000;
            let result = await transfer(msg.caller, amount);
            return result;
        } else {
            return "Already claimed";
        }
        
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount) {
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        } else {
            return "Insufficient funds";
        }
    };

};