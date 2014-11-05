/// <reference path='../DefinitelyTyped/underscore/underscore.d.ts'/>

import _ = require('underscore');

// Util
module U {

    export function containsOnly<T>(a: T[], b: T[]) {
        return _.difference(a, b).length == 0;
    }

    export function isInNode(): boolean {
        return typeof window === 'undefined';
    }

    export function isInBrowser(): boolean {
        return !isInNode();
    }

    export function duplicateAwarePush<T>(array: Array<T>, item: T) {
        if (array.indexOf(item) == -1) {
            array.push(item);
        }
    }

    export interface ILinkedListItem<T> {
        value: T;
        next: ILinkedListItem<T>;
        prev: ILinkedListItem<T>;
    }

    export class LinkedList<T> {

        head: ILinkedListItem<T> = null;
        tail: ILinkedListItem<T> = null;
        changeCount = 0; // can be used for watching changes for example in angularjs

        // Array interface satisfying 

        length = 0;
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
                throw new Error("oh please god dont do this to empty list, aka not implemented");
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

        // extended
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

        replace(newList: U.LinkedList<T>) {
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

        push(...ticks: T[]): number {
            ticks.forEach((tick) => super.push(tick));
            while (this.length > this.limit) {
                this.shift();
            }
            return this.length;
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

        private counts: { [v: string]: number } = {};

        getPositiveNames(): string[] {
            return _.filter(_.keys(this.counts), key => this.counts[key] > 0);
        }

        increment(name) {
            this.counts[name] = U.nvl(this.counts[name], 0) + 1;
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

        increment(object): number {
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

        decrement(object): number {
            var count = _.find(this.counts, count => count.object == object);
            return --count.count;
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
                throw new Error('already contains key');
            }
            this.map.push({
                key: key,
                value: value
            });
        }

        get(key: K) {
            var index = this.indexOf(key);
            if (index == null) {
                throw new Error("no such key");
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
                throw new Error("key not found");
            };
        }
    }
}

export = U;
