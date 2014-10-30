/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>
/// <reference path='../DefinitelyTyped/jquery/jquery.d.ts'/>

import _ = require('underscore');

// Assert
module A {

    export function assertNumbers(...numbers) {
        if (!areNumbers.apply(null, numbers)) {
            throw "not a number";
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