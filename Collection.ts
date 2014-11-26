module Collection {

    export class Iterator<T> {

        private index = -1;

        constructor(private array: T[]) { }

        hasNext(): boolean {
            return (this.index + 1) < this.array.length;
        }

        next(): T {
            if (!this.hasNext()) {
                throw new Error("no items left");
            }
            this.index++;
            return this.get();
        }

        get(): T {
            return this.array[this.index];
        }
    }

    export interface ILinkedListItem<T> {
        value: T;
        next: ILinkedListItem<T>;
        prev: ILinkedListItem<T>;
    }

    export class LinkedList<T> {

        length = 0;
        head: ILinkedListItem<T> = null;
        tail: ILinkedListItem<T> = null;
        changeCount = 0; // for angularjs change tracking

        push(...items: T[]): number {
            items.forEach((item) => {
                var listItem: ILinkedListItem<T> = {
                    value: item,
                    next: null,
                    prev: this.tail
                };
                if (this.length == 0) {
                    this.head = this.tail = listItem;
                } else {
                    this.tail.next = listItem;
                    this.tail = listItem;
                }
                this.length++;
                this.changeCount++;
            });
            return this.length;
        }

        unshift(t: T) {
            if (this.length == 0) {
                throw new Error("unshift for empty list, not implemented");
            }
            var newFirst: ILinkedListItem<T> = {
                value: t,
                next: this.head,
                prev: null
            }
            this.head.prev = newFirst;
            this.head = newFirst;

            this.length++;
            this.changeCount++;

            return this.length;
        }

        shift(): T {
            var value = this.head.value;
            this.head = this.head.next;
            this.length--;
            if (this.length == 0) {
                this.tail = null;
            }
            this.changeCount++;
            return value;
        }

        forEach(cb: (value: T) => void) {
            var cur;
            while (cur = (cur ? cur.next : this.head)) {
                cb(cur.value);
            }
        }

        clear() {
            while (this.length > 0) {
                this.shift();
            }
            this.changeCount++;
        }

        pushList(u: LinkedList<T>) {
            u.forEach(i => this.push(i));
            this.changeCount++;
        }

        pushArray(items: T[]) {
            items.forEach(item => this.push(item));
        }

        replace(newList: LinkedList<T>) {
            this.clear();
            this.pushList(newList);
        }

        replaceArray(newArray: T[]) {
            this.clear();
            this.pushArray(newArray);
        }

        isEmpty(): boolean {
            return this.length == 0;
        }

        clone(): LinkedList<T> {
            var clone = new LinkedList<T>();
            clone.pushList(this);
            return clone;
        }

        toArray(): T[] {
            var array = [];
            this.forEach((item) => array.push(item));
            return array;
        }

        toJSON() {
            return this.toArray();
        }
    }

    export class LimitedLinkedList<T> extends LinkedList<T> {

        constructor(private limit: number) {
            super();
        }

        push(...items: T[]): number {
            items.forEach((item) => super.push(item));
            while (this.length > this.limit) {
                this.shift();
            }
            return this.length;
        }
    }

    interface MapItem<K, V> {
        key: K;
        value: V;
    }

    export class Map<K, V> {
        private map: MapItem<K, V>[] = [];

        put(key: K, value: V) {
            if (this.containsKey(key)) {
                throw new Error("already contains key: " + key);
            }
            this.map.push({
                key: key,
                value: value
            });
        }

        get(key: K) {
            var index = this.indexOf(key);
            if (index == null) {
                throw new Error("no such key: " + key);
            }
            return this.map[index].value;
        }

        private indexOf(key: K) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i].key === key) {
                    return i;
                }
            }
            return null;
        }

        containsKey(key: K) {
            return this.indexOf(key) != null;
        }

        removeKey(key) {
            var before = this.map.length;
            this.map = _.reject(this.map, (i) => i.key == key);
            var after = this.map.length;
            if (after != before - 1) {
                throw new Error("key not found: " + key);
            };
        }
    }

    export function containsOnly<T>(a: T[], b: T[]) {
        return _.difference(a, b).length == 0;
    }

    export function addIfNew<T>(array: Array<T>, item: T) {
        if (array.indexOf(item) == -1) {
            array.push(item);
        }
    }
}

export = Collection;