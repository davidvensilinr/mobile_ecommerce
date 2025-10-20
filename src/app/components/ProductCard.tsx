import Image from 'next/image';

import { Product } from '@/generated/prisma';
interface ProductCardProps{
    product:Product;
}
export default function ProductCard({product}:ProductCardProps){
    return(
        <div className='w-full bg-yellow-100 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 block'>
            <figure>
                <Image
                className="h-48 object-cover"
                width={400}
                src={product.imageUrl}   
                height={500}
                alt="image"
                />
            </figure>
            <h1 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h1>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
            <button className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 w-full">Check it out</button>
        </div>
    )
}