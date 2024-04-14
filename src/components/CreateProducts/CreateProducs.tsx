import React, {useState} from 'react';
import './CreateProducs.scss';
import { Input, Button, notification, Space  } from 'antd';

type NotificationType = 'success' | 'warning' | 'error';

type TProps = {
    AddProduct: (title: string, price: number, stock: number) => void;
}

const CreateProducs = (props: TProps) => {
    const [api, contextHolder] = notification.useNotification();
    const [title, setTitle] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [stock, setStock] = useState<number>();
    
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
          message: 'Warning',
          description:
            "You should fill out all inputs. Please fill out all inputs and try again...",
        });
    };

    const sendHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title && price !== undefined && stock !== undefined) {
            props.AddProduct(title, price, stock);
        } else {
            openNotificationWithIcon('error');
        }
    }   

    return (
        <div className='create_products'>
            <div className="creating_product">
                <h3>Create a new product</h3>
            </div>
            <form onSubmit={sendHandler} className="inputs">
                <Input className='input' onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input className='input' onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price" type='number' />
                <Input className='input' onChange={(e) => setStock(parseFloat(e.target.value))} placeholder="Stock" type='number' />
                {contextHolder}
                <div className="buttons">
                    <button type='submit' className='btn'>Create product</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProducs;