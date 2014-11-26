/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>
/// <reference path='../DefinitelyTyped/jquery/jquery.d.ts'/>

import _ = require('underscore');

module Assert {

    export function assert(statement: boolean, errorMessage: string) {
        if (!statement) {
            throw new Error(errorMessage);
        }
    }

    export function assertBetween(value: number, start: number, end: number) {
        assert(isBetween(value, start, end), "value '" + value + "' not between '" + start + "' and '" + end + "'");
    }

    export function isBetween(value: number, start: number, end: number) {
        assert(start <= end, "invalid parameters");
        return start <= value && value <= end;
    }

    export function assertNumbers(...numbers) {
        assert(areNumbers.apply(null, numbers), "not a number");
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
        assert(areDefined.apply(null, objs), "not defined");
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

export = Assert;
