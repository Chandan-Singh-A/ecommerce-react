import bg from '../../assets/bg.jpeg'
export function Productcomponent(){
    return (
        <div className="product" id="product">
            <img src={bg} alt="noimage" className="img" />
            <p>Name</p>
            <p>Price</p>
            <p>quantity</p>
            <button>Description</button>
            <button className='cartbutton'>Add To Cart</button>
        </div>
    )
}