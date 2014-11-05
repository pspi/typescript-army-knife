// Math
module M {

    export function round(num, frac) {
        var m = Math.pow(10, frac);
        return Math.round(num * m) / m;
    }

    export function radialToX(radial: IRadialCoords, boundingBoxSize): number {
        return (boundingBoxSize / 2) * (1 + radial.radius * Math.cos(degToRad(radial.angle)));
    }

    export function radialToY(radial: IRadialCoords, boundingBoxSize): number {
        return (boundingBoxSize / 2) * (1 + radial.radius * Math.sin(degToRad(radial.angle)));
    }

    export interface IRadialCoords {
        angle: number;
        radius: number;
    }

    export function normalizeDeg360(deg) {
        var norm = deg % 360;
        return deg < 0 ? deg + 360 : deg;
    }

    export function normalizeDeg180(deg) {
        var n360 = normalizeDeg360(deg);
        return n360 > 180 ? n360 - 360 : n360;
    }

    export function radToDeg(rad) {
        return rad * (180 / Math.PI);
    }

    export function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    export function msToKmh(ms) {
        return ms * 3.6;
    }

    export function xytoangle(x, y, boundingBoxSize) {
        var rad = Math.atan2(y - boundingBoxSize / 2, x - boundingBoxSize / 2);
        var deg = radToDeg(rad);
        return normalizeDeg360(deg);
    }

    export function xytoradius(x, y, boundingBoxSize) {
        var distance = Math.sqrt(Math.pow(y - boundingBoxSize / 2, 2) + Math.pow(x - boundingBoxSize / 2, 2));
        var relativeDistance = distance / (boundingBoxSize / 2);
        return Math.min(1.0, relativeDistance);
    }

    export function xytoradial(x, y, boundingBoxSize): IRadialCoords {
        return {
            angle: xytoangle(x, y, boundingBoxSize),
            radius: xytoradius(x, y, boundingBoxSize)
        };
    }

    export function ifOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
        if (aStart > aEnd) {
            throw new Error(aStart + " start is more than end " + aEnd);
        }
        if (bStart > bEnd) {
            throw new Error(bStart + " start is more than end " + bEnd);
        }

        return bStart < aEnd && bEnd > aStart;
    }
}

export = M;