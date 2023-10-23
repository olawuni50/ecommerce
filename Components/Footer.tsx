import { footerLinks } from '@/constants'
import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t-4 mt-10 p-5">
    
        <div className="max-container flex justify-evenly">
            <div>
        <div className="justify-start text-3xl font-bold max-sm:text-xl max-sm:hidden">ShopIT</div>
        <div className="text-gray-500 max-sm:hidden">Shopping Made Easy</div>
        </div>
        
        {footerLinks.map((link) =>(
                        <div key={link.title} className=''>
                            <h3 className="font-bold">{link.title}</h3>
                            {link.links.map((item) =>(
                                <Link key={item.title} href={item.url} 
                                className="text-gray-500 flex flex-col">
                                    {item.title}
                                </Link>
                            ))}

                            </div>
                    ))}
               
                    
        </div>
        <p className="mt-5">@2023 ShopIT. All Rights Reserved</p>

    </footer>
  )
}

export default Footer