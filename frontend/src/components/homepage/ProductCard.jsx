import testShirt from "../../assets/test_shirt.png"

function ProductCard({product}) {
    return <div className= "flex flex-col items-center font-mono text-lg text-black shadow-2xl ">
        <text>{product.name}</text>
        <img className="will-change-auto" src={testShirt}></img>
        <div className="bg-gray-500 w-full">
            <text className="flex justify-center items-center">{product.price}</text>
        </div>
    </div>
}

export default ProductCard