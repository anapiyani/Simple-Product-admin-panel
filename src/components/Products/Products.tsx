import React, {useState} from 'react';
import './Products.scss';
import {MinusCircleOutlined, SortDescendingOutlined, SortAscendingOutlined} from '@ant-design/icons';

type TProduct = {
    id: string;
    name: string;
    price: number;
    stock: number;
}

type TProps = {
    products: TProduct[];
    MinusHandler: (id: string) => void;
}

const Products = (props: TProps) => {
    const [sortType, setSortType] = useState<'name' | 'price' | 'stock' | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

    const handleSort = (type: 'name' | 'price' | 'stock') => {
        if (sortType === type) {
            setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortType(type);
            setSortDirection('asc');
        }
    }
    
    const sortedProducts = [...props.products].sort((a,b) => {
        if (sortType === 'name') {
            return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortType === 'price') {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortType === 'stock') {
            return sortDirection === 'asc' ? a.stock - b.stock : b.stock - a.stock;
        }
        return 0;
    })

    const MinusHandler = (id: string) => {
        props.MinusHandler(id);
    }
    return (
        <div className='productsTable'>
            <table>
                <thead>
                  <tr>
                    <th className='header_names'>Name <button onClick={() => handleSort('name')} className='sortIcon'> <SortDescendingOutlined /> {sortType === 'name' } </button> </th>
                    <th className='header_names'>Price <button onClick={() => handleSort('price')} className='sortIcon'> <SortDescendingOutlined /> {sortType === 'name' }</button> </th>
                    <th className='header_names'>In Stock <button onClick={() => handleSort('stock')} className='sortIcon'> <SortDescendingOutlined /> {sortType === 'name' }</button> </th>
                  </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product.id}>
                          <td className='td name'>{product.name}</td>
                          <td className='td price'>{product.price}</td>
                          <td className='td stock'><p>{product.stock > 0 ? product.stock : 'Not available'}</p> <button onClick={() => MinusHandler(product.id)}><MinusCircleOutlined /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products;