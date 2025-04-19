/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext =  createContext();

export const AppContextProvider = ({children}) => {

    const  currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setuser] = useState(null)
    const[isSeller,setIsSeller] =useState(false)
    const[showUserLoging,setShowUserLogin] =useState(false)
    const[products,setProducts] =useState([])

    const[cartItems,setCardItems] =useState({})
    const[searchQuery,setSearchQuery] =useState({})


    //fetch seller states
    const fetchSeller = async() =>{
        try{
            const{data} = await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(true)
            }
        // eslint-disable-next-line no-unused-vars
        }catch(error){
            setIsSeller(false)
        }
    }

    // Festch User Auther Status

    const fetchUser = async()=>{
        try{
            const{data} = await axios.get('api/user/is-auth');
            if(data.success){
                setuser(data.user)
                setCardItems(data.user.cartItems)
            }
        }
        catch(error){

            setuser(null)

        }
    }


    const fetchProducts = async () => {
         
          try{
            const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }
            else{
                toast.error(data.message)
            }
          }
          catch(error){
            toast.error(data.message)
          }
    }
  

  // add product to card
  const addToCart = (itemId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
     // eslint-disable-next-line no-undef
     cartData[itemId] += 1;
    }else{
        cartData[itemId] = 1;
    }
    setCardItems(cartData);
    toast.success("Added to cart")
  }

  const updateCartItem = (itemId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCardItems(cartData)
    toast.success("card Updated")
  }


// remove product from card
const removeFromCart =(itemId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId] -= 1;
        if(cartData[itemId] === 0){
            delete cartData[itemId];
        }
    }

    toast.success("removed from Cart")
    setCardItems(cartData)

}


// get Cart Item Count
const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount
}


// get card total Amount
 const getCartAmount =() =>{
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product)=> product._id === items);
        if(cartItems[items]>0){
            totalAmount += itemInfo.offerPrice * cartItems[items]
        }
    }
    return Math.floor(totalAmount * 100)/100;
 }


  useEffect(()=>{
    fetchUser()
    fetchSeller()
    fetchProducts()

  },[])
  //update Database cart items

  useEffect(()=>{
    const updateCart =async () =>{
        try{
        const{data} =await axios.post('/api/cart/update',{cartItems})
        if(!data.success){
            toast.error(data.message)
        }
        }catch(error){
            toast.error(error.message)
        }
    }

    if(user){
        updateCart()
    }

  },[cartItems])

    const value = {
        navigate,
        user,
        setuser,
        isSeller,
        setIsSeller,
        showUserLoging,
        setShowUserLogin,
        products,
        currency,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        axios,
        fetchProducts

    }

    return <AppContext.Provider  value={value}>
        {children}
        </AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () =>{
    return useContext(AppContext)
}