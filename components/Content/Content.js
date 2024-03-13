import "./content.css"

import React, { useEffect, useState } from 'react'

export default function Content() {
  let [categories,setCategories]=useState([]);
  let [itemcount,setItemcount]=useState(0);
  let [products,setProducts]=useState([]);
  let [url,setUrl]=useState("https://fakestoreapi.com/products");
  let [cart,setCart]=useState([]);
  let [filteredcart,setFilteredcart]=useState([]);
  let [total,setTotal]=useState(0);
  useEffect(()=>{
      fetch("https://fakestoreapi.com/products/categories")
      .then(res=>res.json())
      .then(data=>{
        let catAll=["All",...data];
        setCategories(catAll);
      })
      fetch(url)
      .then(res=>res.json())
      .then(data=>setProducts(data))
  },[url])
  let selected=(e)=>{
    if(e.target.value==="All"){
        setUrl("https://fakestoreapi.com/products");
    }
    else{
        setUrl(`https://fakestoreapi.com/products/category/${e.target.value}`)
    }
  }
  let addToCart=(id)=>{
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>{
            let items=[...cart,data];
            setCart(items);
            setItemcount(itemcount+1);
            setTotal(total+(data.price))
            console.log(data)
        })
  }
  let deleted=(id)=>{
        console.log(id);
        let filter=cart.filter(each=>(
            each.id!==id
        ));
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setTotal(total-data.price)
        })
        setCart(filter);
        setItemcount(itemcount-1);
  }
  let deleteAll=()=>{
    console.log("Delete all")
    setCart([]);
    setTotal(0);
    setItemcount(0);
  }
  return (
    <div className="category-main">
        <div className="category-div">
            <h6>Select Category</h6>
            <select className="form-select" onChange={selected}>
                {
                    categories.map(each=>(
                        <option value={each} key={each}>{each}</option>
                    ))
                }
            </select>
        </div>
        <div className="product-res">
            {
                products.map(each=>(
                    <div className="ind-prod">
                        <img src={each.image} className="image"></img>
                        <p>{each.title}</p>
                        <div className="price-rating">
                            <div className="price">
                                <h6>Price</h6>
                                <p className="price-in-rup">₹{each.price}</p>
                            </div>
                            <div className="rate">
                                <h6>Rating</h6>
                                <p className="price-in-rup">{each.rating.rate}</p>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-danger button" onClick={()=>addToCart(each.id)}>Add to cart</button>
                        </div>
                    </div>
                ))
            }
        </div>
        <div>
            <div className='add-cart'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
                <span>{itemcount}</span>
                <h6>Shopping Cart</h6>
            </div>
            <div>
                {
                     <table className="table">
                        <thead>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th><button className="btn bg-danger" onClick={()=>deleteAll()}>Delete All</button></th>
                        </thead>
                        <tbody>
                            {
                                cart.map(each=>(
                                    <tr>
                                        <td className="cart-title">{each.title}</td>
                                        <td><img src={each.image} className="cart-image"/></td>
                                        <td>₹{each.price}</td>
                                        <td><button className="btn btn-danger" onClick={()=>deleted(each.id)}><span class="material-symbols-outlined">Delete</span></button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                     </table>
                     
                }
                <h2 className="total">Total:-{total.toFixed(2)}</h2>
            </div>
        </div>
        
    </div>
  )
}
