"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.upsert({
            where: {
                email: "PawsFounding@gmail.com"
            },
            update: {},
            create: {
                email: "PawsFounding@gmail.com",
                name: "Paws FOunding",
                isOng: true,
                address: 'Calle las palmeras 123',
                country: 'Argentina',
                city: 'San Luis',
                collection: 120000.75
            }
        });
        const user2 = yield prisma.user.upsert({
            where: {
                email: "juntosporlosanimales@gmail.com"
            },
            update: {},
            create: {
                email: "juntosporlosanimales@gmail.com",
                name: "Juntos por los animales",
                isOng: true,
                address: 'Hipolito Irigoyen 124',
                country: 'Argentina',
                city: 'Buenos aires',
                collection: 130000.55
            }
        });
        const comment = yield prisma.comment.create({
            data: {
                content: "Hola, me gustaria adoptar a este perro",
                user: {
                    connect: {
                        email: ""
                    }
                }
            }
        });
    });
}
run().catch((e) => {
    console.log(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map