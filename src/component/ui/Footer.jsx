import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="py-3" style={{ backgroundColor: '#123524', color: 'white' }}>
            <div className="container text-center">
                <div className="mb-2">
                    <a href="#" className="text-white text-decoration-none mx-2">Home</a>
                    <a href="#" className="text-white text-decoration-none mx-2">About</a>
                    <a href="#" className="text-white text-decoration-none mx-2">Shop</a>
                    <a href="#" className="text-white text-decoration-none mx-2">Contact</a>
                </div>

                <div className="mb-2">
                    <a href="https://github.com/Swapiano-Studio" className="text-white mx-2"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/i-kadek-sananda-nova-herawan" className="text-white mx-2"><FaLinkedin /></a>
                    <a href="https://www.instagram.com/sanandanova_20" className="text-white mx-2"><FaInstagram /></a>
                </div>

                <p className="small mb-0">&copy; 2025 Nova Herawan</p>
            </div>
        </footer>
    )
}

export default Footer