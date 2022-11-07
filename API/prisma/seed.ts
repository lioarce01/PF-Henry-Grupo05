import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
    const user = await prisma.user.upsert({
        where:{
            email: "PawsFounding@gmail.com"
        },
        update:{},
        create:{
            email: "PawsFounding@gmail.com",
            name: "Paws FOunding",
        }
    });
    
}

run().catch((e) => {
    console.log(e);
    process.exit(1)
    
})
.finally(async()=>{
    prisma.$disconnect()
})