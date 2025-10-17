export const metadata={
    title:"ZenCartopia - Add Your Product"


}

export default function addProduct(){
    return(
<div><form>
    <h2 className=" font-black font-serif text-center">Add your Product here</h2>
    <br></br>
    <input name="name"
    required
    placeholder="Name of your project"
    className="bg-white rounded-lg w-full p-2 mb-4"/>
    <input 
    required
    name="description"
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