///ts:import=M
import M = require('./M'); ///ts:import:generated

// String
module S {


    function zeroes(n: number): string {
        var r = '';
        while (n-- > 0) r += '0';
        return r;
    }

    export function numberFormat(num, frac): string {
        if (frac < 0) throw "invalid fraction: " + frac;
        num = M.round(num, frac);
        var split = num.toString().split('.');
        var s;
        if (split.length == 1) {
            if (frac == 0) {
                s = split[0];
            } else {
                s = split[0] + '.' + zeroes(frac);
            }
        } else if (split.length == 2) {
            s = split[0] + '.' + split[1] + zeroes(frac - split[1].length);
        } else {
            throw "wtf"
        };
        return s;
    }

}

export = S;
