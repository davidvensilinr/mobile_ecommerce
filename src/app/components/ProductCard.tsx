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
                src="https://images.unsplash.com/photo-1758405341470-7e54014b1f4b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"      
                height={500}
                alt="image"
                />
            </figure>
            <h1 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h1>
            <p>{product.description}</p>
            <p>Rs.{product.price}</p>
            <button className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 w-full">Check it out</button>
        </div>
    )
}