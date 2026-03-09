"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getUsers(req, res) {
    try {
        const users = await prisma.users.findMany();
        res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error retrieving users",
        });
    }
}
//# sourceMappingURL=userController.js.map