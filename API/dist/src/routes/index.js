"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const posts_1 = __importDefault(require("./posts"));
const users_1 = __importDefault(require("./users"));
const ongs_1 = __importDefault(require("./ongs"));
const router = express_1.default.Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/ongs', ongs_1.default);
router.use('/posts', posts_1.default);
router.use('/users', users_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map