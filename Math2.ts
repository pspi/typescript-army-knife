// 'Math' already taken in javascript, lets use Math2
module Math2 {

    export function mod(value: number, base: number): number {
        return ((value % base) + base) % base;
    }

    export function cap(min: number, value: number, max: number): number {
        return Math.min(Math.max(min, value), max);
    }

    export function round(num: number, frac: number): number {
        var shift = Math.pow(10, frac);
        return Math.round(num * shift) / shift;
    }

    export function normalizeDeg360(deg: number): number {
        var norm = deg % 360;
        return deg < 0 ? deg + 360 : deg;
    }

    export function normalizeDeg180(deg: number): number {
        var n360 = normalizeDeg360(deg);
        return n360 > 180 ? n360 - 360 : n360;
    }

    export function radToDeg(rad: number): number {
        return rad * (180 / Math.PI);
    }

    export function degToRad(deg: number): number {
        return deg * (Math.PI / 180);
    }

    export function msToKmh(ms: number): number {
        return ms * 3.6;
    }

    export function regionsOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
        if (start1 > end1) {
            return false;
        }
        if (start2 > end2) {
            return false;
        }
        return start2 < end1 && end2 > start1;
    }
}

export = Math2;
