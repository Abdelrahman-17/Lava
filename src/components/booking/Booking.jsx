import React, { useEffect, useState } from 'react'
import './Booking.css'
import Icon1 from '../../assets/Icon-3-Our-Service.png'
import Icon2 from '../../assets/Our-Service-Icon.png'
import Icon3 from '../../assets/Our-Service-Icon2.png'
import Icon4 from '../../assets/Our-Service-Icon4.png'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { adddetailstobooking, addservicetobooking, bookingitem } from '../../redux/slice/bookingslice'
import data from '../../../public/data.json'
import { useNavigate } from 'react-router-dom'
const Booking = () => {
    const [active, setActive] = useState(true)
    const [services, setServices] = useState([])
    const [typecar, setTypecar] = useState('')
    const [typecolor, setTypecolor] = useState('')
    const [typemuquad, setTypemuquad] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const item = useSelector(bookingitem)
    console.log('item', item);
    useEffect(() => {
        if (data) {
            setServices(data.booking_services)
        }
    }, [data])
    const addbooking = (ele) => {
        dispatch(addservicetobooking(ele))
    }
    let arr = {
        typecar: typecar,
        typecolor: typecolor,
        typemuquad, typemuquad
    }
    const confirmselect = () => {
        console.log(arr);
        // dispatch(adddetailstobooking(arr))
    }
    return (
        <>
            {/* <ToastContainer /> */}
            {item && item.length > 0 ?
                <section className='filter'>
                    <select aria-label="Default select example" className='form-select'
                        onChange={(e) => {
                            setTypecar(e.target.value);
                        }}
                    >
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                        <option value="car">car</option>
                    </select>
                    <select aria-label="Default select example" className='form-select'
                        onChange={(e) => {
                            setTypecolor(e.target.value);
                        }}
                    >
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                        <option value="color">color</option>
                    </select>
                    <select aria-label="Default select example" className='form-select'
                        onChange={(e) => {
                            setTypemuquad(e.target.value);
                        }}
                    >
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                        <option value="maquad">maquad</option>
                    </select>
                    <button className='confirm' onClick={confirmselect}>confirm select</button>
                </section>
                :
                <section className="our-services-booking">
                    <h3>our services</h3>
                    <h2>our comprehensive services</h2>
                    <div className="container-cards" >
                        {
                            services &&
                            services.map((ele, index) => {
                                return (
                                    <div className={`${active ? "card active" : "card"}`} key={index}>
                                        <img className="card-icon" src={ele.ImageUrl} alt="img" />
                                        <h3 className="card-title">{ele.title}</h3>
                                        <p className="card-desc">{ele.description}</p>
                                        <button className="card-btn" onClick={() => addbooking(ele)}>Add booking</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            }
        </>
    )
}

export default Booking