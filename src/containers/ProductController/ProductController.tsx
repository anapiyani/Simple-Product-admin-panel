import React, {useState} from 'react';
import './ProductController.scss';
import Products from '@/components/Products/Products';
import CreateProducs from '@/components/CreateProducts/CreateProducs';
import { NotAvailble } from '@/components/NotAvailble/NotAvailble';

type TProduct = {
    id: string;
    name: string;
    price: number;
    stock: number;
}

const ProductController = () => {
    const [showAvailble, setShowAvailble] = useState<boolean>(false);
    const [products, setProducts] = useState<TProduct[]>([
        {id: 'asus-d3jd3', name: 'ASUS Zenbook', price: 1200, stock: 3},
        {id: 'acer-3mw24', name: 'Acer Predator', price: 900, stock: 2}
    ]);

    const AddProducts = (title: string, price: number, stock: number) => {
        const exitingProduct = products.find(product => product.name.toLowerCase() === title.toLowerCase());
        if (exitingProduct) {
            let suffix = 1;
            let newTitle = `${title}-${suffix}`;
            const replace = window.confirm(`${title} already exists. Do you want to replace it?`);
            if (replace) {
                const updateProducts = products.map(product => {
                    if (product.id === exitingProduct.id) {
                        let newPrice = price !== 0 ? price : product.price;
                        let newStock = stock !== 0 ? product.stock + stock : product.stock;
                        return {...product, price: newPrice, stock: newStock };
                    }
                    return product;
                });
                setProducts(updateProducts);
            } else {
                suffix++;
                newTitle = `${title}-${suffix}`;
                const newProductId = `${title}-${Math.random().toString(36).substring(2, 9)}`;
                setProducts([...products, {id: newProductId, name: newTitle, price, stock}]);
            }
        } else {
            setProducts([...products, {id: `${title}-${Math.random().toString(36).substring(2, 9)}`, name: title, price, stock}]);
            setShowAvailble(false);
        }
    }

    const MinusHandler = (id: string) => {
        const minusedProducts = products.map((product) => {
            if (product.id === id && product.stock > 0) {
                return {...product, stock: product.stock - 1}
            } else if (product.stock == 0) {
                return {...product, stock: 0}
            }
            return product;
        })  
        setProducts(minusedProducts);
        const hasStock = products.some((product) => product.stock > 1);
        if (!hasStock) {
            setProducts([]);
            setShowAvailble(true);
        } 
    }

    return (
        <div className='controller'>
            { 
                showAvailble ? <NotAvailble/> : 
                <div className="products">
                    <Products products={products} MinusHandler={MinusHandler}/>
                </div>
            }
            <hr />
            <div className="createProducts">
                <CreateProducs AddProduct={AddProducts}/>
            </div>
        </div>
    )
}

export default ProductController;