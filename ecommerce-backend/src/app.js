"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var port = 4000;
var app = (0, express_1.default)();
app.listen(port, function () {
    console.log("App listening at the port ".concat(port));
});
