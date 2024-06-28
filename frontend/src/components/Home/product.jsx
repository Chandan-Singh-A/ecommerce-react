import { useNavigate } from 'react-router-dom';
import style from './home.module.css'

/**
 * 
 * @param {object} props 
 * @param {object} props.data 
 * @param {object} props.leftButtonText 
 * @param {object} props.leftButtonStyle
 * @param {object} props.onLeftButtonClick
 * @param {object} props.rightButtonText 
 * @param {object} props.rightButtonStyle
 * @param {object} props.onRightButtonClick
 * @returns {JSX.Element}
 */

export function Productcomponent(props) {

    const { onRightButtonClick = () => { }, onLeftButtonClick = () => { }, leftButtonStyle = {}, rightButtonStyle = {}, rightButtonText = "", leftButtonText = "" } = props

    const data = props.data
    return (
        <div className={style.product}>
            <div className={style.imgBox}>
                <img src={`http://localhost:7700/${data.productimg}`} alt="noimage" className="img" />
            </div>
            <div className={style.details}>
                <p className={style.title}>Product Name:{data.productname}</p>
                <p className={style.price}>Product Price:{data.productprice}</p>
                <p className={style.quantity}>Product Quantitiy:{data.productquant}</p>
            </div>
            <div className={style.action}>
                <button className={style.button} style={leftButtonStyle} onClick={() => onLeftButtonClick(data._id)}>{leftButtonText}</button>
                <button className={style.button} style={rightButtonStyle} onClick={() => onRightButtonClick(data._id)}>{rightButtonText}</button>
            </div>
        </div>
    )
}