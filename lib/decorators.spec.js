"use strict";
/*!
 * Copyright 2018 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2018-06-27 00:31:58
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert = require("assert");
var mobx_1 = require("mobx");
var mocha_1 = require("mocha");
var nonenumerable_1 = require("monofile-utilities/lib/nonenumerable");
var decorators_1 = require("./decorators");
var keys_1 = require("./keys");
var parse_store_1 = require("./parse-store");
var utils_1 = require("./utils");
mocha_1.describe('decorator:format', function () {
    mocha_1.it('format date/regexp', function () {
        var time = new Date();
        var reg = /abc/igum;
        var N = /** @class */ (function () {
            function N() {
                this.date = time;
                this.reg = reg;
            }
            tslib_1.__decorate([
                decorators_1.date
            ], N.prototype, "date", void 0);
            tslib_1.__decorate([
                decorators_1.regexp
            ], N.prototype, "reg", void 0);
            return N;
        }());
        var n = new N();
        assert.deepStrictEqual(utils_1.toJSON(n), {
            date: time.toISOString(),
            reg: { source: reg.source, flags: reg.flags },
        });
        var data = JSON.parse(JSON.stringify(n));
        var store = new N();
        store.date = new Date(0);
        store.reg = /def/igu;
        assert.notDeepEqual(utils_1.toJSON(store), utils_1.toJSON(n));
        parse_store_1.parseStore(store, data);
        assert.deepStrictEqual(store, n);
    });
});
mocha_1.describe('decorator:ignore', function () {
    mocha_1.it('should be ignored', function () {
        var Node = /** @class */ (function () {
            function Node() {
                this.n0 = 'n0';
                this.ignored = 'ignored';
                this.normal = 'normal';
            }
            tslib_1.__decorate([
                mobx_1.observable
            ], Node.prototype, "n0", void 0);
            tslib_1.__decorate([
                decorators_1.ignore, mobx_1.observable
            ], Node.prototype, "ignored", void 0);
            tslib_1.__decorate([
                mobx_1.observable
            ], Node.prototype, "normal", void 0);
            return Node;
        }());
        var node = new Node();
        assert.deepStrictEqual(utils_1.toJSON(node), { normal: 'normal', n0: 'n0' });
    });
    mocha_1.it('should not working with nonenumerable', function () {
        var Node = /** @class */ (function () {
            function Node() {
                this.n0 = 'n0';
                this.n1 = 'n1';
                this.n2 = 'n2';
                this.n3 = 'n3';
            }
            tslib_1.__decorate([
                mobx_1.observable
            ], Node.prototype, "n0", void 0);
            tslib_1.__decorate([
                nonenumerable_1.nonenumerable, mobx_1.observable
            ], Node.prototype, "n1", void 0);
            tslib_1.__decorate([
                mobx_1.observable
            ], Node.prototype, "n2", void 0);
            tslib_1.__decorate([
                nonenumerable_1.nonenumerable
            ], Node.prototype, "n3", void 0);
            return Node;
        }());
        assert.deepStrictEqual(utils_1.toJSON(new Node()), { n0: 'n0', n1: 'n1', n2: 'n2' });
    });
});
mocha_1.describe('decorator:version', function () {
    var Node = /** @class */ (function () {
        function Node() {
            this.id = 0;
        }
        tslib_1.__decorate([
            decorators_1.version(1)
        ], Node.prototype, "id", void 0);
        Node = tslib_1.__decorate([
            decorators_1.version(2)
        ], Node);
        return Node;
    }());
    var node = new Node();
    mocha_1.it('should persist versions', function () {
        var _a, _b;
        assert.deepStrictEqual(utils_1.toJSON(node), (_a = {}, _a[keys_1.Keys.Versions] = (_b = { id: 1 }, _b[keys_1.Keys.NodeVersion] = 2, _b), _a.id = 0, _a));
    });
    mocha_1.it('should persist versions with extends', function () {
        var _a;
        var P = /** @class */ (function () {
            function P() {
                this.p = 1;
            }
            tslib_1.__decorate([
                decorators_1.version(1)
            ], P.prototype, "p", void 0);
            return P;
        }());
        var C = /** @class */ (function (_super) {
            tslib_1.__extends(C, _super);
            function C() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.c = 2;
                return _this;
            }
            tslib_1.__decorate([
                decorators_1.version(2)
            ], C.prototype, "c", void 0);
            return C;
        }(P));
        var c = new C();
        assert.deepStrictEqual(utils_1.toJSON(c), (_a = {
                p: 1,
                c: 2
            },
            _a[keys_1.Keys.Versions] = {
                p: 1,
                c: 2,
            },
            _a));
    });
});
//# sourceMappingURL=decorators.spec.js.map