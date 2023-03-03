import React, { useState } from 'react';
import { Item } from '../types';
import ListItem from './ListItem';
const List: React.FC = () => {
    const [list, setList] = useState<Array<Item>>([]);
    const [newItemInfo, setNewItemInfo] = useState('');
    const addNewItemHandler = () => {
        const newItem: Item = { text: newItemInfo };
        setList([...list, newItem]);
    };
    const newItemInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemInfo(e.target.value);
    };
    return (
        <div>
            <label htmlFor='addItem'>Add</label>
            <input id='addItem' type='text' onChange={newItemInfoHandler} />
            <input
                type='submit'
                onClick={e => addNewItemHandler()}
                value='Add item'
            />
            <ul>
                {list && list.map(item => <ListItem prop={item}></ListItem>)}
            </ul>
        </div>
    );
};
export default List;
