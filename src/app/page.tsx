"use client";

import { useState, useEffect } from "react";
import { getProducts } from "./actions/productActions";
import ProductCard from "./components/ProductCard";
export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch products from server when page loads
  useEffect(() => {
    (async () => {
      const res = await getProducts(); // server call
      setProducts(res);
    })();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (value.endsWith(" ")) {
      setLoading(true);
      try {
        const res = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: value.trim() }),
        });
        const data = await res.json();
        
        if (data.error) {
          setResponses([data.error]);
          return;
        }
        
        // Handle the responses array from the API
        const outputs = Array.isArray(data.responses) 
          ? data.responses 
          : ["No valid response from model"];
          
        setResponses(outputs);
      } catch (err) {
        console.error("API Error:", err);
        setResponses(["Error: Failed to get response from server"]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">ZenCartopia</h1>

      {/* Input + Model Responses */}
      <div className="mb-6">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter mobile name..."
          className="border border-gray-400 p-2 rounded w-full"
        />
        {loading && <p className="text-gray-500 mt-3">Loading...</p>}
        {!loading && responses.length > 0 && (
          <div className="mt-4 space-y-2">
            {responses.map((r, i) => (
              <div
                key={i}
                className="p-3 border rounded bg-gray-50 shadow-sm"
              >
                <strong>Response {i + 1}:</strong> {r}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Products fetched from Prisma */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.slice(0).map((product) => (
            <ProductCard product={product} key={product.id}/>

        ))}
      </div>
    </div>
  );
}
