import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext =  createContext();

export const AppContextProvider = ({children}) => {

    const  currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setuser] = useState(null)
    const[isSeller,setIsSeller] =useState(false)
    const[showUserLoging,setShowUserLogin] =useState(false)
    const[products,setProducts] =useState([])
    const[cartItems,setCardItems] =useState({})
    const[searchQuery,setSearchQuery] =useState({})

  const  fetchProducts = async ()=>{
     setProducts(dummyProducts)
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
    fetchProducts()
  },[])

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
        getCartCount

    }

    return <AppContext.Provider  value={value}>
        {children}
        </AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () =>{
    return useContext(AppContext)
}