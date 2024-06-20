import swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import style from './style.module.css'

export function Productcomponent(props) {
    const data = props.data
    const navigate = useNavigate();

    function showdescription() {
        swal.fire({
            html: `
                <div>
                    <p><strong>Product Name:</strong> ${data.productname}</p>
                    <p><strong>Product Price:</strong> ${data.productprice}</p>
                    <p><strong>Product Quantity:</strong> ${data.productquant}</p>
                    <p><strong>Product Description:</strong> ${data.productdesc}</p>
                </div>
            `,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                container: 'custom-swal-container',
            }
        });
    }

    function addtocart(ob) {
        var cartob = {
            userid: ob._id,
            sellermail: ob.sellermail,
        }
        fetch("http://localhost:7700/addtocart", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(cartob),
        })
            .then((result) => {
                if (result.status == 200) {
                    swal.fire({
                        icon: 'success',
                        title: 'Added To Cart',
                        showConfirmButton: false,
                        timer: 1500 // Automatically close after 1.5 seconds
                    });
                } else if (result.status == 300) {
                    swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Already Added in Cart'
                    });
                } else {
                    navigate("/login");
                }
            }).catch((err) => {
                console.log(err);
            });
    }
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
                <button className={style.button} onClick={showdescription}>Description</button>
                <button className={style.button} onClick={() => addtocart(data)}>Add To Cart</button>
            </div>
        </div>
    )
}