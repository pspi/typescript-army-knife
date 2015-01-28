///ts:import=Math2
import Math2 = require('./Math2'); ///ts:import:generated

module String {

    function repeatChar(c: string, n: number): string {
        var r = "";
        while (n-- > 0) {
            r += c
        }
        return r;
    }

    export function formatDecimalNumber(value: number, decimals: number): string {
        if (decimals < 0) {
            throw new Error("invalid fraction: " + decimals);
        }
        var result;
        var value = Math2.round(value, decimals);
        var split = value.toString().split('.');
        if (split.length == 1) {
            if (decimals == 0) {
                result = split[0];
            } else {
                result = split[0] + '.' + repeatChar('0', decimals);
            }
        } else if (split.length == 2) {
            result = split[0] + '.' + split[1] + repeatChar('0', decimals - split[1].length);
        } else {
            throw new Error();
        }
        return result;
    }

    export function zeroPad(v: number, z: number): string {
        var vstr = v.toString();
        return repeatChar('0', z - vstr.length) + vstr;
    }

    export function formatDuration(durationInMs: number): string {
        // avoid 01:60 results, so round to seconds before starting to work
        var secs = Math.round(durationInMs / 1000);

        return zeroPad(Math.floor(secs / 60), 2) + ':' + zeroPad(Math.round(secs % 60), 2);
    }

}

export = String;
