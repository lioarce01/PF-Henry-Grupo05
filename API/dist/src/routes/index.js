"use strict";
// Router configuration
// What routes are we using?
// Where are we taking them from?
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("./posts"));
const users_1 = __importDefault(require("./users"));
const comments_1 = __importDefault(require("./comments"));
const shelters_1 = __importDefault(require("./shelters"));
const router = express_1.default.Router();
router.use('/shelters', shelters_1.default);
router.use('/posts', posts_1.default);
router.use('/users', users_1.default);
router.use('/comments', comments_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map