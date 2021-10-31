

// TODO:    fix infinity            +
//          fix %                   +
//          fix -1, give brackets   +
//          add brackets            +
//          fix brackets for one number  
//          edit github ico
//          edit checks result      
//          fix max width           +-


class Calculator {      
    constructor (idResF) {     
        this.idResF = idResF;   // output adress
        this.sBuf = '';         // string for math
        this.nMax = 18;         // max calculator string
        this.m = ["+", "-", "*", "/", "**", "%"];       // right operators
        this.count = 0;         // left brackets counter
    }

    isException(n) {        // returns true if exception finded     
        
        let last = this.last();     // last symbol from sBuf
        let lnum = this.isNum(last);

        if(this.isNum(n))
            return last == ")";  // not add number if ) is last symbol
        else 
        {
            switch(n)
            {
                case '(':
                    if(this.sBuf == '' || this.isOp(last))   // add ( if buf empty or last symbol is operator
                    {
                        this.count++;    
                        return false;
                    }
                    return true;
                case ')':
                    if(lnum && this.count)        // add ) if last symbol is number and have left brackets
                    {
                        this.count--;
                        return false;
                    }
                    return true;
                case '.':
                    if (lnum)           // last symbol is number
                    {
                        for(let i = this.sBuf.length - 1; i >= 0; i--)  // check string from end
                        {               // to start for find operators
                            if (!this.isNum(this.sBuf[i]))   
                                return this.sBuf[i] == "."; // if we finded operator or bracket, 
                                // and it's not a dot, than not exception and add dot
                        }   
                        return false; 
                    }
            }

            if (!this.isOp(n))  // if n not "good" operator, then not add
                return true;

            if (lnum || last == ")")     // can add operator only after number or bracket
                return false;

            if (!(n == "-" && last != "." && last != "-"))        // special for minus, cant add after dot and minus
                return true;

            if (last != "(" )      
            {
                this.sBuf += "(";
                this.count++;
            }
            
            return false;
        }
    }

    isNum(n) { return n <= 9 && n >= 0; }   
    last() { return this.sBuf[this.sBuf.length - 1]; }     // last symbol of buf

    isOp(op) {        // return true if we have operator
        for(let i = 0; i < this.m.length; i++)
        {
            if(this.m[i] == op)
                return true;
        }
        return false;
    }

    AddSymbol(newNum) {         //summary numbers in nSum when push number_button
        if (this.sBuf == 'Infinity' || this.sBuf == '0')
            this.sBuf = '';         // clear

        if(this.sBuf.length >= this.nMax) return;       // size exc
        if(this.isException(newNum)) return;        // other exc

        this.sBuf += newNum;        // add new number in the end of string
        this.Update();
    }

    DelSymbol() {
        let str = "";
        this.count = 0;
        for(let i = 0; i < this.sBuf.length - 1; i++)       // copy string without last element
        {
            str += this.sBuf[i];
            if (this.sBuf[i] == "(")
                this.count++;
            if (this.sBuf[i] == ")")
                this.count--;
        }
        this.sBuf = str;
        this.Update();
    }

    Clear() { 
        this.count = 0;
        this.sBuf = '';
        this.Update();
    }    
    
    Update() {      // change output
        this.idResF.value = this.sBuf;
    }

    Result () {         // easiest math
        if(!this.sBuf)   // check empty
            return;

        let l = this.last();
        if(this.isNum(l) || l == ")")
        {  
        this.sBuf = String(eval(this.sBuf));     // math, returns as string    
        this.Update();
        }
    }

}

const Calc = new Calculator (document.getElementById('1'));