

// TODO:    fix infinity            +
//          fix %                   +
//          fix -1, give brackets   +
//          add brackets            +
//          fix brackets for one number  +
//          
//          edit checks result      +    
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
        {
            if (this.sBuf == '0')
            this.sBuf = '';      
            return last == ")";  // not add number if ) is last symbol   // clear
        }
            
        else 
        {
            switch(n)
            {
                case '(':
                    if(this.sBuf == '' || this.isOp(last) || last == "(")   // add ( if buf empty or last symbol is operator
                    {
                        this.count++;    
                        return false;
                    }
                    return true;
                case ')':
                    if((lnum || last == ")") && this.count)        // add ) if last symbol is number and have left brackets
                    {
                        if(last != ")")     // checking only for first bracket
                        {
                            for(let i = this.sBuf.length - 1; i >= 0; i--)  // check string from end
                            {                                               // to start for find operators
                                if (!this.isNum(this.sBuf[i]))          // if we are found operator or bracket or point,  
                                {
                                    if(this.sBuf[i] == ".")     // if it's point or go next
                                        continue;

                                    if(this.sBuf[i] == "(")
                                        return true;       // if found left bracket than not add

                                    if(this.isOp(this.sBuf[i]))
                                        break;
                                }                                // for cant use simple number in brackets
                            } 
                        }           
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
        if (this.sBuf == 'Infinity')
        this.sBuf = '';
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
            
            if(this.sBuf == 'Infinity' || this.sBuf == 'NaN') { 
                brokeCalculator();
                this.idResF.value = 'What???'
            }      
        }
    }
}

const Calc = new Calculator (document.getElementById('1'));

function brokeCalculator() {
    Array.from(document.querySelectorAll('.calculator_button')).reverse().forEach( (button, index) => {
        fallDown(button, {  
            y: 180 * Math.random(),
            x: 60 * Math.random(),
            angle: 400 * Math.random(),
            speed: 2 + 2 * Math.random(),
            side: index % 2,
            height: 600,
            rotation: 20 * (Math.random() - 0.5),
        });
    });
}

function fallDown(element, options) {
    const begins = {
        x: element.offsetLeft,
        y: element.offsetTop
    }

    let rotate = options.rotation;

    element.style.position = 'fixed';

    element.style.left = begins.x + 'px';
    element.style.top = begins.y + 'px';
    element.style.transition = 'none';

    function timeLap() {    
        if(element.offsetTop > begins.y + options.height) {
            element.style.visibility = 'hidden';
            return;
        }
    
        element.style.left = element.offsetLeft + (options.side ? 1 : -1) * options.speed + 'px';
        element.style.top = begins.y + getY((options.side ? 1 : -1) * (element.offsetLeft - begins.x), options)  + 'px';
    
        element.style.transform = `rotate(${ rotate }deg)`;
        rotate += options.rotation;

        setTimeout( () => {
            timeLap();
        }, options.speed );
    }
    
    timeLap();
}

function getY(x, options) {
    return Math.pow(( x - options.x), 2) / options.angle - options.y;
}