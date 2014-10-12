import _ = require('underscore');

// Util
module U {


    export interface ILinkedListItem<T> {
        value: T;
        next: ILinkedListItem<T>;
        prev: ILinkedListItem<T>;
    }

    export class LinkedList<T> {
        first: ILinkedListItem<T>;
        last: ILinkedListItem<T>;
        size = 0;

        push(data: T) {
            var item: ILinkedListItem<T> = {
                value: data,
                next: null,
                prev: this.last
            };
            if (this.size == 0) {
                this.first = this.last = item;
            } else {
                this.last.next = item;
                this.last = item;
            }
            this.size++;
        }

        removeFirst() {
            this.first = this.first.next;
            this.size--;
            if (this.size == 0) {
                this.last = null;
            }
        }

        forEach(cb: (value: T) => void) {
            var cur;
            while (cur = (cur ? cur.next : this.first)) {
                cb(cur.value);
            }
        }
    }

    export function areNumbers(...args) {
        for (var i = 0; i < args.length; i++) {
            if (!_.isNumber(args[i])) {
                return false;
            }
        }
        return true;
    }

    export function nvl(value, fallback) {
        return value ? value : fallback;
    }


    export class NameCounter {

        private values: { [v: string]: number } = {};

        getPositiveNames(): string[] {
            return _.filter(_.keys(this.values), key => this.values[key] > 0);
        }

        increment(name) {
            this.values[name] = U.nvl(this.values[name], 0) + 1;
        }

        decrement(name) {
            this.values[name]--;
        }
    }
}

export = U;
