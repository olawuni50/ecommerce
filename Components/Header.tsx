 "use client"
import React, {useState} from 'react'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useAppDispatch } from '@/hooks/storeHook';
import { toggleCart } from '@/redux/features/cartSlice';
import useCartTotal from '@/hooks/useCartTotal';
import {signIn, useSession, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {BiSearch} from 'react-icons/bi'
import { ThemeSwitcher } from './ThemeSwitcher';
import SignUp from './SignUp';
import Button from './Button';



const Header = () => {

  const dispatch = useAppDispatch();

  const {totalQuantity} = useCartTotal();

  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const {status, data:session} = useSession({required:true, onUnauthenticated(){
    // handle user not authenticated
  }});

  console.log(status, session)

  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
    

    const handleSearch = (e: {preventDefault: () => void}) =>{
        e.preventDefault();

        if(searchValue) {
            router.push(`/search/${searchValue}`)
        }

    }

  const toggleForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen)
  }

  const signinHandler = async () =>{
    try{
      await signIn();
    }catch(error){
      console.log('SIGN IN ERROR', error)

    }
  }

  return (
    <>

    <div>
    <SignUp isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
      
    </div>

    <header className="w-full z-10 border-b-2">

      <nav className="flex justify-between items-center sm:px-16
            px-6 py-2">

        <Link href="/" className="text-3xl text-bold max-sm:text-2xl">ShopIT</Link>    

        <div>
        {/* <form onSubmit={handleSearch} className="absolute md:static top-10 left-20">

                    <input type='text' value={searchValue} onChange={(e) =>setSearchValue(e.target.value)} placeholder="Search for product and category"
                    className="bg-primary p-2 md:text-md font-medium border-2 max-container
                    border-gray-100 focus:outline-none focus:border-2 md:top-0
                    focus:border-gray-300 w-[300px] md:w-[350px] rounded-full"/>

                </form> */}
          
          
          </div>    

          
          

        <div className="flex gap-5">  

        <button className="flex mt-2" onClick={() => dispatch(toggleCart())}>
        <AiOutlineShoppingCart  className="relative text-2xl cursor-pointer" />

        <span className="absolute text-white rounded-full bg-purple-900 mt-1 
        w-6 h-6 top-0 ml-4">{totalQuantity}</span>
        </button>        

                {session ? (
                  <>
                   <Link href="order"  className="text-md bg-amber-700 px-3 py-1 rounded shadow-lg text-white"> Order </Link>
                   {/* <h2>{session.user.name}</h2> */}
                   <Button handleClick={signOut} text="LOGOUT"/>
                  </>

                ): (
                  <>
                  <Button handleClick={toggleForm} text="SIGNUP"/>
                  <Button handleClick={signinHandler} text="SIGNIN"/>
                  
                  </>
                  
                )}

                <ThemeSwitcher />
       
       
        
        </div>

        </nav>



    </header>
    </>
  )
}

export default Header