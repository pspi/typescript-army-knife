
/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>

import _ = require('underscore');

module Coord {

    export var ORIGIN_2D = { x: 0, y: 0 };
    export var ORIGIN_3D = { x: 0, y: 0, z: 0 };

    export interface Coord2D {
        x: number;
        y: number;
    }

    export interface Coord3D extends Coord2D {
        z: number;
    }

    export function distance<T extends Coord2D>(a: T, b: T) {
        var t = minus(a, b);
        return Math.sqrt(_.reduce<number, number>(_.values(t),(memo, num) => memo + num * num, 0));
    }

    export function times<T extends Coord2D>(a: T, factor: number): T {
        var r = {};
        _.keys(a).forEach(key => r[key] = a[key] * factor);
        return <T> r;
    }

    export function minus<T extends Coord2D>(...args: T[]): T {
        return <T> _.foldl(args,(a, b) => {
            var r = {};
            _.keys(a).forEach(key => r[key] = a[key] - b[key]);
            return r;
        });
    }

    export function plus<T extends Coord2D>(...args: T[]): T {
        return <T> _.foldl(args,(a, b) => {
            var r = {};
            _.keys(a).forEach(key => r[key] = a[key] + b[key]);
            return r;
        });
    }
}

export = Coord;