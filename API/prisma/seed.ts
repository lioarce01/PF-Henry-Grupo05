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
            isOng: true,
            address: 'Calle las palmeras 123',
            country: 'Argentina',
            city: 'San Luis',
            collection: 120000.75
        }

    });
    const user2 = await prisma.user.upsert({
        where:{
            email: "juntosporlosanimales@gmail.com"
        },
        update:{},
        create:{
            email: "juntosporlosanimales@gmail.com",
            name: "Juntos por los animales",
            isOng: true,
            address: 'Hipolito Irigoyen 124',
            country: 'Argentina',
            city: 'Buenos aires',
            collection: 130000.55
        }

    });

    const comment = await prisma.comment.create({
        data: {
            content: "Hola, me gustaria adoptar a este perro",
            user: {
                connect: {
                    email: ""
                }
            },
        }
    })
    
}

run().catch((e) => {
    console.log(e);
    process.exit(1)
    
})
.finally(async()=>{
    prisma.$disconnect()
})