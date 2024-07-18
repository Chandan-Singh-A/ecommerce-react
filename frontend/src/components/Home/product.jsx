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
    const flag=props.flag
    return (
        <div className={style.product}>
            <div className={style.imgBox}>
                <img src={`http://localhost:7700/${data.pimg}`} alt="noimage" className="img" />
            </div>
            <div className={style.details}>
                <p className={style.title}>Product Name:{data.pname}</p>
                <p className={style.price}>Product Price:{data.pprice}</p>
                <p className={style.quantity}>Product Quantitiy:{data.pquant}</p>
            </div>
            {!flag?<div className={style.action}>
                <button className={style.button} disabled={flag} style={leftButtonStyle} onClick={() => onLeftButtonClick(data._id)}>{leftButtonText}</button>
                <button className={style.button} disabled={flag} style={rightButtonStyle} onClick={() => onRightButtonClick(data._id)}>{rightButtonText}</button>
            </div>:null}
        </div>
    )
}