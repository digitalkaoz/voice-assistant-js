"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Container_1 = require("../src/Container");
var mapping_1 = require("./fixtures/mapping");
console.log('alexa' + '\n');
Container_1.lambda(mapping_1.default)(require('../tests/fixtures/alexa/event.json'), {
    succeed: console.log
}, console.log);
console.log('\n' + 'api-ai' + '\n');
Container_1.lambda(mapping_1.default)(require('../tests/fixtures/apiai/event.json'), {}, console.log);
console.log('\n' + 'google-action' + '\n');
Container_1.lambda(mapping_1.default)(require('../tests/fixtures/google-action/event.json'), {}, console.log);
