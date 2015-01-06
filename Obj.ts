///ts:import=Is
import Is = require('./Is'); ///ts:import:generated

module Obj {

    export function property(obj: any, prop: string) {
        if (Is.undefined(obj)) {
            return null;
        }

        // constants, return as is
        if (prop.match('^[0-9]+$'))
            return prop;

        // rewrite open array subscripts
        prop = prop.replace(/\[[A-Za-z0-9\.]+\]/g, (sub) => {
            return "." + property(obj, sub.substring(1, sub.length - 1));
        });

        // traverse nested properties
        var arr = prop.split(".");
        while (arr.length && (obj = obj[arr.shift()]))
            ;
        return obj;
    }
}

export = Obj;
