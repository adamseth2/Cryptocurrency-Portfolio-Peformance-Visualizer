import React, { FC } from 'react';
import { Item } from '../types';

const ListItem: FC<any> = ({ prop: item }) => {
    // const [item} = prop;
    {
    }
    return <li>{item.text}</li>;
};

export default ListItem;
