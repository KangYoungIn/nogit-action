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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runClone = runClone;
const core = __importStar(require("@actions/core"));
const fse = __importStar(require("fs-extra"));
const fs = __importStar(require("fs"));
const git = __importStar(require("isomorphic-git"));
const node_1 = __importDefault(require("isomorphic-git/http/node"));
const auth_1 = require("../utils/auth");
async function runClone() {
    const repoUrl = core.getInput('repo-url');
    const dir = core.getInput('directory');
    await fse.ensureDir(dir);
    const onAuth = (0, auth_1.getAuthIfAvailable)();
    await git.clone({
        fs,
        http: node_1.default,
        dir,
        url: repoUrl,
        singleBranch: true,
        depth: 1,
        ...(onAuth ? { onAuth } : {})
    });
    core.info(`Cloned ${repoUrl} into ${dir}`);
}
