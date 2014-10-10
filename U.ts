import _ = require('underscore');

// Util
module U {


    export interface ILinkedListItem {
        value: any;
        next: ILinkedListItem;
        prev: ILinkedListItem;
    }

    export class LinkedList {
        first: ILinkedListItem;
        last: ILinkedListItem;
        size = 0;

        push(data) {
            var item: ILinkedListItem = {
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

        forEach(cb: (data) => void) {
            var cur = this.first;
            do {
                cb(cur.value);
            } while ((cur = cur.next) != null);
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
