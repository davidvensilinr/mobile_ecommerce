import prisma from "@prisma/client";

export async function POST(req){
    const data = await req.json();
    const product = await prisma.product.create({data});
    return Response.json(product);
} 