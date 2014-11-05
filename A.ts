/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>
/// <reference path='../DefinitelyTyped/jquery/jquery.d.ts'/>

import _ = require('underscore');

// Assert
module A {

    export function assert(statement: boolean, errorMessage: string) {
        if (!statement) {
            throw new Error(errorMessage);
        }
    }

    export function assertBetween(value: number, start: number, end: number) {
        assert(start <= end, "invalid parameters");
        assert(value <= end, "value '" + value + "' higher than allowed " + end);
        assert(value >= start, "value '" + value + "' higher than allowed " + end);
    }

    export function isBetween(value: number, start: number, end: number) {
        assert(start <= end, "invalid parameters");
        return start <= value && value <= end;
    }

    export function assertNumbers(...numbers) {
        if (!areNumbers.apply(null, numbers)) {
            throw new Error("not a number");
        }
    }
    export function areNumbers(...numbers) {
        numbers.forEach((n) => {
            // NaN is actually a number if you ask underscore, crazy huh
            if (_.isNaN(n) || !_.isNumber(n)) {
                return false;
            }
        });
        return true;
    }

    export function isDefined(obj) {
        return !_.isUndefined(obj) && !_.isNull(obj) && !_.isNaN(obj)
    }

    export function areDefined(...objs) {
        for (var i = 0; i < objs.length; i++) {
            if (!isDefined(objs[i])) {
                return false;
            }
        }
        return true;
    }

    export function assertDefined(...objs) {
        if (!areDefined.apply(null, objs)) {
            throw new Error("not defined");
        }
    }

    export function assertTag($e: JQuery, tag: string) {
        var actual = $e.prop('tagName');
        if (actual.toLowerCase() != tag) {
            throw actual + " is not " + tag;
        }
    }

    export function assertObjectHasKeys(obj, keys: string[]) {
        keys.forEach((key) => {
            if (!(key in obj)) {
                throw key + ' not in ' + _.keys(obj);
            }
        });
    }

}

export = A;