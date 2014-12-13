/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>
/// <reference path='../DefinitelyTyped/jquery/jquery.d.ts'/>

import _ = require('underscore');

///ts:import=Is
import Is = require('./Is'); ///ts:import:generated

module Assert {

    export function assert(statement: boolean, errorMessage: string) {
        if (!statement) {
            throw new Error(errorMessage);
        }
    }

    export function between(value: number, start: number, end: number) {
        assert(Is.between(value, start, end), "value '" + value + "' not between '" + start + "' and '" + end + "'");
    }

    export function numbers(...numbers) {
        assert(Is.number.apply(null, numbers), "not a number");
    }

    export function defined(...objs) {
        assert(Is.defined.apply(null, objs), "not defined");
    }

    export function tag($e: JQuery, tag: string) {
        var actual = $e.prop('tagName');
        if (actual.toLowerCase() != tag) {
            throw actual + " is not " + tag;
        }
    }

    export function objectHasKeys(obj, keys: string[]) {
        keys.forEach((key) => {
            if (!(key in obj)) {
                throw key + ' not in ' + _.keys(obj);
            }
        });
    }

}

export = Assert;
