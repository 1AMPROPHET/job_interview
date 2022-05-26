"use strict";
exports.MyPromise = void 0;
var Status;
(function (Status) {
    Status["PENDING"] = "pending";
    Status["FULFILLED"] = "fulfilled";
    Status["REJECTED"] = "rejected";
})(Status || (Status = {}));
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        var _this = this;
        this.status = Status.PENDING;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        this.resolve = function (value) {
            try {
                queueMicrotask(function () {
                    if (_this.status === Status.PENDING) {
                        _this.status = Status.FULFILLED;
                        _this.value = value;
                        _this.resolveCallbacks.forEach(function (fn) { return fn(); });
                        _this.rejectCallbacks = [];
                    }
                });
            }
            catch (e) {
                _this.reject(e);
            }
        };
        this.reject = function (reason) {
            try {
                queueMicrotask(function () {
                    if (_this.status === Status.PENDING) {
                        _this.status = Status.REJECTED;
                        _this.reason = reason;
                        _this.rejectCallbacks.forEach(function (fn) { return fn(); });
                        _this.resolveCallbacks = [];
                    }
                });
            }
            catch (e) {
                _this.reject(e);
            }
        };
        try {
            executor(this.resolve, this.reject);
        }
        catch (e) {
            this.reject(e);
        }
    }
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (v) { return v; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (e) { throw e; };
        var promise = new MyPromise(function (resolve, reject) {
            if (_this.status === Status.FULFILLED) {
                queueMicrotask(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        _this.resolvePromise(promise, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            if (_this.status === Status.REJECTED) {
                queueMicrotask(function () {
                    try {
                        var x = onRejected(_this.reason);
                        _this.resolvePromise(promise, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
            if (_this.status === Status.PENDING) {
                _this.resolveCallbacks.push(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        _this.resolvePromise(promise, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
                _this.rejectCallbacks.push(function () {
                    try {
                        var x = onRejected(_this.reason);
                        _this.resolvePromise(promise, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            }
        });
        return promise;
    };
    MyPromise.prototype.resolvePromise = function (promise, x, resolve, reject) {
        var _this = this;
        if (promise === x) {
            reject(new TypeError('Chaning circle detected in promise'));
        }
        var called = false;
        if (typeof x === 'object' && x != null || typeof x === 'function') {
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        if (called)
                            return;
                        called = true;
                        _this.resolvePromise(promise, y, resolve, reject);
                    }, function (e) {
                        if (called)
                            return;
                        called = true;
                        reject(e);
                    });
                }
                else {
                    resolve(x);
                }
            }
            catch (e) {
                if (called)
                    return;
                called = true;
                reject(e);
            }
        }
        else {
            resolve(x);
        }
    };
    return MyPromise;
}());
// @ts-ignore
MyPromise.defer = MyPromise.deferred = function () {
    var deferred = {};
    deferred.promise = new MyPromise(function (resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
};
module.exports = MyPromise;
