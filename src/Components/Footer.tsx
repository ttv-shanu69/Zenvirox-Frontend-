import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <div>
      <footer className="relative mt-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#35928d] to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">ZENVI<span className="text-[#35928d]">ROX</span></h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted source for wellness insights, stress relief strategies, and mindful living tips.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-[#35928d] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[#35928d] transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-[#35928d] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-[#35928d] transition-colors">Instagram</Link></li>
                <li><Link href="#" className="hover:text-[#35928d] transition-colors">Twitter</Link></li>
                <li><Link href="#" className="hover:text-[#35928d] transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2026 BreakLife News. All rights reserved. Designed with ♥ for wellness.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
