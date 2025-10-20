import { redirect } from "next/navigation";
import {prisma} from "@/lib/db/prisma";
export const metadata={
    title:"ZenCartopia - Add Your Product"


}

async function AddProduct(formData : FormData){
    "use server";
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price"));
    await prisma.product.create({
        data:{name,description,imageUrl,price}
    });
    redirect('/');
}
export default function addProduct(){
    
    return(
<div><form action={AddProduct}>
    <h2 className=" font-black font-serif text-center">Add your Product here</h2>
    <br></br>
    <input name="name"
    required
    type="text"
    placeholder="Name of your product"
    className="bg-white rounded-lg w-full p-2 mb-4"/>
    <textarea 
    required
    name="description"
    type="text"
    placeholder="Description of your product"
    className="bg-white rounded-lg w-full p-2 mb-4"/>
    <input
    required
    name="price"
    type="number"
    placeholder="Price"
    className="bg-white rounded-lg w-full p-2 mb-4"
    />
    <input
    required
    type="url"
    placeholder="Image URl"
    name="imageUrl"
    className="bg-white rounded-lg w-full p-2 mb-4"
    />
    <button
    type="submit"
    className="font-black bg-amber-200 hover:bg-teal-400 rounded-lg w-full p-2"
    >
        Add your product
    </button>
    </form>

</div>
    );
}