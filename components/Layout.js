import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
    const router = useRouter()
    if (router.route != '/sign-in' && router.route != '/sign-up') {
        return <div>
            <Navbar />
            <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
                {children}
            </div>
            <Footer />
        </div>
    }
    else {
        return <div>
            <div className="mx-auto max-w-7xl py-12 px-6 lg:px-8">
                {children}
            </div>
            <Footer />
        </div>
    }
}

export default Layout