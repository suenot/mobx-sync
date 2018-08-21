"use strict";
/*!
 * Copyright 2018 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2018-06-27 00:25:58
 */
Object.defineProperty(exports, "__esModule", { value: true });
var keys_1 = require("./keys");
function inject(target, key) {
    if (key !== void 0 && !target.hasOwnProperty(key)) {
        Object.defineProperty(target, key, {
            enumerable: false, value: Object.create(target[key] || null),
        });
    }
    if (target.hasOwnProperty(keys_1.Keys.Inject)) {
        return;
    }
    Object.defineProperty(target, keys_1.Keys.Inject, {
        value: true,
        configurable: false,
        enumerable: false,
    });
    var toJSON = target.toJSON;
    target.toJSON = function () {
        var data = toJSON ? toJSON.call(this) || {} : this;
        if (this[keys_1.Keys.Format]) {
            var dump = {};
            for (var key_1 in data) {
                if (data.hasOwnProperty(key_1)
                    && this[keys_1.Keys.Format][key_1]
                    && this[keys_1.Keys.Format][key_1].serializer) {
                    dump[key_1] = this[keys_1.Keys.Format][key_1].serializer(data[key_1]);
                }
                else {
                    dump[key_1] = data[key_1];
                }
            }
            data = dump;
        }
        if (this[keys_1.Keys.Ignores]) {
            var dump = {};
            for (var key_2 in data) {
                if (data.hasOwnProperty(key_2) && !this[keys_1.Keys.Ignores][key_2]) {
                    dump[key_2] = data[key_2];
                }
            }
            data = dump;
        }
        data[keys_1.Keys.Versions] = target[keys_1.Keys.Versions];
        return data;
    };
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map