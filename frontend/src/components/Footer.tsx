import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
export default function Footer() {
    return (
       <footer className='py-4'>
            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-4 text-center text-gray-600 max-w-3xl mx-auto'>
                <p className='text-xs font-semibold'>&copy; 2025 Let's Play</p>
                <span className='hidden sm:inline-block w-px h-4 bg-gray-600'/>
                <p className='text-xs font-medium'>Follow Us</p>
                <div className='flex gap-3 mt-2 sm:mt-0'>
                    <a href="https://www.facebook.com" aria-label="Facebook">
                        <FaFacebook size={22} className='hover:text-blue-600' />
                    </a>
                    <a href="https://www.twitter.com" aria-label="Twitter">
                        <FaTwitter size={22} className='hover:text-blue-500' />
                    </a>
                    <a href="https://www.instagram.com" aria-label="Instagram">
                        <FaInstagram size={22} className='hover:text-pink-500' />
                    </a>
                    <a href="https://www.youtube.com" aria-label="Youtube">
                        <FaYoutube size={22} className='hover:text-red-600' />
                    </a>
                </div>
            </div>
       </footer>
    );
}