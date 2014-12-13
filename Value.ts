
import _ = require('underscore');

///ts:import=Util
import Util = require('./Util'); ///ts:import:generated

module Value {

    export class CachedValue<T> {

        private value: T;

        constructor(private calculateValue: () => T) { }

        get(): T {
            if (!this.value) {
                this.value = this.calculateValue();
            }
            return this.value;
        }
    }

    export class Unique {

        private i = 0;

        constructor(private prefix: string) { }

        get() {
            return this.prefix + (++this.i);
        }
    }

    export class NameCounter {

        private counts: { [v: string]: number } = {};

        getPositiveNames(): string[] {
            return _.filter(_.keys(this.counts), key => this.counts[key] > 0);
        }

        increment(name) {
            this.counts[name] = Util.nvl(this.counts[name], 0) + 1;
        }

        decrement(name) {
            this.counts[name]--;
        }
    }

    interface ObjectCount<T> {
        object: T;
        count: number;
    }

    export class ObjectCounter<T> {

        private counts: ObjectCount<T>[] = [];

        increment(object: T): number {
            var count = _.find(this.counts, count => count.object == object);
            if (count == null) {
                count = {
                    object: object,
                    count: 0
                }
                this.counts.push(count);
            }
            return ++count.count;
        }

        decrement(object: T): number {
            var count = _.find(this.counts, count => count.object == object);
            return --count.count;
        }

        getPositiveValues(): T[] {
            return _.pluck(_.filter(this.counts, (c) => c.count > 0), 'object');
        }
    }
}

export = Value;
