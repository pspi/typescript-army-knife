// Math
module M {

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

    export function normalizeDeg(deg) {
        var norm = deg % 360;
        return deg < 0 ? deg + 360 : deg;
    }

    export function radToDeg(rad) {
        return normalizeDeg(rad * (180 / Math.PI));
    }

    export function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    export function xytoangle(x, y, boundingBoxSize) {
        var rad = Math.atan2(y - boundingBoxSize / 2, x - boundingBoxSize / 2);
        var deg = radToDeg(rad);
        return normalizeDeg(deg);
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
        }
                }
}

export = M;