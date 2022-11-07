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
    const user3 = await prisma.user.upsert({
        where:{
            email: "animalsPaws@gmail.com"
        },
        update:{},
        create:{
            email: "animalsPaws@gmail.com",
            name: "animals Paws",
            isOng: true,
            address: 'Manuel belgrano 124',
            country: 'Argentina',
            city: 'Córdoba',
            collection: 160000.55
        }

    });
    const user4 = await prisma.user.upsert({
        where:{
            email: "animalsPaws@gmail.com"
        },
        update:{},
        create:{
            email: "animalsPawsFounding@gmail.com",
            name: "animals Paws Founding",
            isOng: true,
            address: 'Av. San Martin 124',
            country: 'Argentina',
            city: 'Tierra del Fuego',
            collection: 137000.665
        }

    });
    const user5 = await prisma.user.create({
        
        data:{
            email: "ayudanosaayudar@gmail.com",
            name: "Ayudanos a Ayudar",
            isOng:  true,
            address: 'Antofagasta 234',
            country: 'Chile',
            city: 'Santiago',
            collection: 175000.665
        }

    });

    const post = await prisma.post.upsert({
        where:{
            title: "Proyecto de recaudacion",
        },
        update:{},
        create:{
            title: "Proyecto de recaudacion",
            description: "Necesitamos juntar $134.000 para conseguir stock de alimentos para perros",
            img: 'https://edit.org/photos/img/blog/e1f-recaudar-fondos-plantillas-editar-online.jpg-1300.jpg',
            published: true,
            authorId: user.id,
        } 
    });
    const comment= await prisma.comment.upsert({
        where:{
            content: "gran proyecto, exitos!",
        },
        update:{},
        create:{
            content: "gran proyecto, exitos!",
            postId: post.id,
        } 
    })
    console.log({user},{user2});
    
}

run().catch((e) => {
    console.log(e);
    process.exit(1)
    
})
.finally(async()=>{
    prisma.$disconnect()
})