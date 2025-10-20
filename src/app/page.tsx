import {prisma} from '@/lib/db/prisma';
import ProductCard from './components/ProductCard';
export default async function Home() {
  const products = await prisma.product.findMany();
  return (
    <div>
      <h1 className="font-mono text-2xl italic font-normal tracking-widest text-center">Welcome to <span className="font-serif decoration-white text-black">ZenCartopia</span> !!!</h1>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(0).map((product)=>(
          <ProductCard product={product} key={product.id}/>
        ))}
        </div>
    </div>
  );
}
