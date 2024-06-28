import React from 'react';
import { Pagination } from 'antd';
import style from './home.module.css'
export function Paginationn(props) {
    function onChange(page,size){
        props.onChangeInput(page,size);
    }
    return(
        <div className={style.footer}>
            <Pagination
                total={props.value}
                onChange = {onChange}
                defaultPageSize={20}
                defaultCurrent={1}
            />
        </div>
    )
}