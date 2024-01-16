import React, { useEffect, useState } from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './Hotdeal.css'
import axios from 'axios'
import Carousel from 'react-bootstrap/Carousel'
import { FiHeart } from 'react-icons/fi'
// const Hotdeal = () => {
//     const [carousel_products, setCarousel_products] = useState([])
//     const [specialitems, setSpecialitems] = useState([])
//     const [carousel_deals, setCarousel_deals] = useState([])
//     useEffect(() => {
//         axios.get("../public/data.json")
//             .then(res => {
//                 setCarousel_products(res.data.carousel_products)
//                 setCarousel_deals(res.data.carousel_deals)
//                 setSpecialitems(res.data.special_items)
//             })
//             .catch(err => console.log(err))
//     }, [])
//     const carouselUI = carousel_products.map((item) => {
//         return (
//             <div className="card addtoproductcart" key={item.id} style={{ cursor: "pointer" }}>
//                 <img alt="" src={item.ImageUrl} />
//                 <p className="text-center title">{item.title}</p>
//                 <div className="text-center text-warning font-12 mb-2">
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                 </div>
//                 <span className="text-center">
//                     <span className="text-warning me-4">{item.price}</span>
//                     <span className="text-decoration-line-through">{item.a_price}</span>
//                 </span>
//                 <div className="add bg-white">
//                     <button className="btn btn-dark text-white" onClick={() => dispatch(addtocart(item))}>add to cart</button>
//                     <h3><FiHeart /></h3>
//                 </div>
//             </div>
//         )
//     });
//     const carouseldealUI = carousel_deals.map((item) => {
//         return (
//             <div className="card addtoproductcart" key={item.id} style={{ cursor: "pointer" }}>
//                 <img alt="" src={item.ImageUrl} />
//                 <p className="text-center title">{item.title}</p>
//                 <div className="text-center text-warning font-12 mb-2">
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                     <i className="fa-regular fa-star ms-1"></i>
//                 </div>
//                 <span className="text-center">
//                     <span className="text-warning me-4">{item.price}</span>
//                     <span className="text-decoration-line-through">{item.a_price}</span>
//                 </span>
//                 <div className="add bg-white">
//                     <button className="btn btn-dark text-white" onClick={() => dispatch(addtocart(item))}>add to cart</button>
//                     <h3><FiHeart /></h3>
//                 </div>
//             </div>
//         )
//     });
//     return (
//         <>
//             <section className="hot-deal">
//                 <div className="special-items">
//                     <p className="bg-dark text-white d-grid p-3" style={{ placeContent: "center", cursor: "pointer" }}>Special-Items</p>
//                     {specialitems.map((item) => {
//                         return (
//                             <div key={item.id} className="item">
//                                 <img src={item.ImageUrl} height={100} width={100} alt="" />
//                                 <div className="detailofitem">
//                                     <p style={{ marginBottom: "-6px" }}>{item.b_title}</p>
//                                     <p style={{ marginBottom: "5px" }}>{item.a_title}</p>
//                                     <span className="text-warning">${item.price}</span>
//                                     <span className="text-decoration-line-through">${item.a_price}</span>
//                                 </div>
//                             </div>
//                         )
//                     })
//                     }
//                 </div>
//                 <div className="deals">
//                     <i className="fa-solid fa-fire me-2 font-14"></i>
//                     <span>Hot Deal</span>
//                     <div className="line"></div>

//                     <Carousel data-bs-theme="dark">
//                         <Carousel.Item>
//                             <div className="cards">{carouselUI}</div>
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <div className="cards">{carouselUI}</div>
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <div className="cards">{carouselUI}</div>

//                         </Carousel.Item>
//                     </Carousel>
//                     <br />
//                     <Carousel data-bs-theme="dark">
//                         <Carousel.Item>
//                             <div className="cards">{carouseldealUI}</div>
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <div className="cards">{carouseldealUI}</div>
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <div className="cards">{carouseldealUI}</div>

//                         </Carousel.Item>
//                     </Carousel>
//                 </div>
//             </section>
//         </>
//     )
// }
const Hotdeal = () => {

    return (
        <>
            <div>Hotdeal</div>
        </>
    )
}
export default Hotdeal