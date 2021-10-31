

// TODO:    fix infinity            +
//          fix %                   +
//          fix -1, give brackets   
//          add brackets
//          fix brackets
//          edit github ico
//          edit checks result
//          fix max width           +-


class Calculator {      
    constructor (idResF) {     
        this.idResF = idResF;   // output adress
        this.sBuf = '';         // string for math
        this.nMax = 15;          // max calculator string
        this.m = ["+", "-", "*", "/", "**", "%"];       // right operations
    }

    isException(n) {        // returns true if exception finded
        if (this.sBuf == 'Infinity' || this.sBuf == '0')
            this.sBuf = '';  

         

        if(!this.isNumber(n)) 
        {
            if (!this.isNumber(this.sBuf[this.sBuf.length - 1]))        // if last symbol 
            {
                if(n == "-" || n == "(" || n == ")")        // add left bracket if minus after empty or operation
                {   
                    if(n == "-")            
                        this.sBuf += "(";
                    return false;
                }  
                return true;        // not a number (or empty), then cannot add operations
            }
                

            if(n == ".") {      // speial dot exception
                for(let i = this.sBuf.length - 1; i >= 0; i--)  // check string from end
                {               // for find operators
                    if (!this.isNumber(this.sBuf[i])) 
                        return this.sBuf[i] == "."; // if we finded operator, 
                        // and it's not a dot, than not exception
                }   
                return false;  
            }

            if(!this.isOperator(n))   // if we hadn't this operator in our collection then exception
                return true;
            
            return false;
        }
    }

    isNumber(n) { return n <= 9 && n >= 0; }    // barckets is number for add

    isOperator(op) {
        let e = false;  
            for(let i = 0; i < this.m.length; i++)
            {
                if(this.m[i] == op)
                    e = true;
            }
        return e;
    }

    AddSymbol(newNum) {         //summary numbers in nSum when push number_button
        if(this.sBuf.length >= this.nMax) return;       // size error
        if(this.isException(newNum)) return;        // other errors
        this.sBuf += newNum;        // add new number in the end of string
        this.Update();
    }

    DelSymbol() {
        let str = "";
        for(let i = 0; i < this.sBuf.length - 1; i++)       // copy sting without last element
        {
            str += this.sBuf[i];
        }
        this.sBuf = str;
        this.Update();
    }

    Clear() {     
        this.sBuf = '';
        this.Update();
    }    
    
    Update() {      // change output
        this.idResF.value = this.sBuf;
    }

    Result () {         // easiest math
        if(!this.sBuf)   // check empty
            return;

        if((this.isOperator(this.sBuf[this.sBuf.length - 1]) || 
            this.sBuf[this.sBuf.length - 1] == ".")) // check last symbol
                return; // mb delete and check sBuf for NaN
        
        alert(this.sBuf);
        this.sBuf = eval(this.sBuf);        // math

        this.sBuf = String(this.sBuf);     // back to string     
        this.Update();
    }

}

const Calc = new Calculator (document.getElementById('1'));