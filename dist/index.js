"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const clone_1 = require("./commands/clone");
const status_1 = require("./commands/status");
const add_1 = require("./commands/add");
const commit_1 = require("./commands/commit");
const log_1 = require("./commands/log");
const push_1 = require("./commands/push");
const checkout_1 = require("./commands/checkout");
const fetch_1 = require("./commands/fetch");
async function run() {
    const action = core.getInput('action');
    try {
        switch (action) {
            case 'clone':
                await (0, clone_1.runClone)();
                break;
            case 'status':
                await (0, status_1.runStatus)();
                break;
            case 'add':
                await (0, add_1.runAdd)();
                break;
            case 'commit':
                await (0, commit_1.runCommit)();
                break;
            case 'log':
                await (0, log_1.runLog)();
                break;
            case 'push':
                await (0, push_1.runPush)();
                break;
            case 'checkout':
                await (0, checkout_1.runCheckout)();
                break;
            case 'fetch':
                await (0, fetch_1.runFetch)();
                break;
            default:
                throw new Error(`Unsupported action: ${action}`);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}
run();
