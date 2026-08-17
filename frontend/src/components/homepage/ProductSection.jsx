import ProductCard from "./ProductCard.jsx";

const testProduct = {
    id: 1,
    name: "Shirt",
    price: 29.99
};

function ProductSection() {
    return <div className= " grid grid-cols-2 m-2 gap-2 md:grid-cols-3">
        <ProductCard product={testProduct}/>
        <ProductCard product={testProduct}/>
        <ProductCard product={testProduct}/>
        <ProductCard product={testProduct}/>
        <ProductCard product={testProduct}/>
        <ProductCard product={testProduct}/>
        <ProductCard product={testProduct}/>
    </div>
}
export default ProductSection