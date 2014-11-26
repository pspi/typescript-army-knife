///ts:import=Math2
import Math2 = require('./Math2'); ///ts:import:generated

module String {

    function repeat(c: string, n: number): string {
        var r = "";
        while (n-- > 0) {
            r += c
        }
        return r;
    }

    export function formatNumber(round: number, frac: number): string {
        if (frac < 0) {
            throw new Error("invalid fraction: " + frac);
        }
        var result;
        var round = Math2.round(round, frac);
        var split = round.toString().split('.');
        if (split.length == 1) {
            if (frac == 0) {
                result = split[0];
            } else {
                result = split[0] + '.' + repeat('0', frac);
            }
        } else if (split.length == 2) {
            result = split[0] + '.' + split[1] + repeat('0', frac - split[1].length);
        } else {
            throw new Error();
        }
        return result;
    }

}

export = String;
