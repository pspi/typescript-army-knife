/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>

import _ = require('underscore');

module Util {

    export function isInNode(): boolean {
        return typeof window === 'undefined';
    }

    export function isInBrowser(): boolean {
        return !isInNode();
    }

    export function nvl(value, fallback) {
        return value ? value : fallback;
    }

}

export = Util;
