import _ = require('underscore');

module Is {

    export function between(value: number, start: number, end: number) {
        if (start > end) {
            return false;
        }
        return start <= value && value <= end;
    }


    export function number(...numbers) {
        numbers.forEach((n) => {
            // NaN is actually a number if you ask underscore, crazy huh
            if (_.isNaN(n) || !_.isNumber(n)) {
                return false;
            }
        });
        return true;
    }

    export function defined(...objs) {
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            if (_.isUndefined(obj) || _.isNull(obj) || _.isNaN(obj)) {
                return false;
            }
        }
        return true;
    }

    export function undefined(obj) {
        return !defined(obj);
    }

}

export = Is;