import bg from '../../assets/bg.jpeg'
import { Productcomponent } from '../pagecomponents/product';
export function Homepagecomponent() {
    return (
        <div id="container" className="container">
            {/* <header id="header">
                <h1 id="header-site">Welcome In Ecommerce Site</h1>
            </header> */}
            <div id="header">
                <h1 id="header-site">Welcome In Ecommerce Site</h1>
            </div>
            <div id="checklogindiv" className="checklogindiv">
                <nav className="nav">
                </nav>
            </div>
            <div id="main-div" className="main-div">
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
                <Productcomponent />
            </div>
            {/* <select id="loadquantity">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select> */}
            {/* <button style={{alignContent: 'center'}} id="load-more">Load More</button> */}
        </div>
    );
}
