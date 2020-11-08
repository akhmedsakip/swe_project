import React from 'react'
import Footer from './Footer'
import { SocialIcon } from 'react-social-icons';
import Image from "./amita.png";

export function FooterContainer() {
    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                    <img src={Image} width="200" height="undefined"></img>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Explore</Footer.Title>
                    <Footer.Link href="./hotels">Hotels</Footer.Link>
                    <Footer.Link href="#">Rooms</Footer.Link>
                    <Footer.Link href="#">Services</Footer.Link>
                    <Footer.Link href="#">Discounts</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Contact Us</Footer.Title>
                    <Footer.Link href="#">Almaty, Kazakhstan</Footer.Link>
                    <Footer.Link href="#">+7 777 654 32 10</Footer.Link>
                    <Footer.Link href="./">AMITA HOTELS</Footer.Link>
                    <Footer.Link href="https://mail.google.com/mail/?view=cm&source=mailto&to=reservations@amita.com">reservations@amita.com</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Follow us</Footer.Title>
                    <Footer.Link href="http://facebook.com"><SocialIcon url="http://facebook.com" />Facebook</Footer.Link>
                    <Footer.Link href="http://instagram.com"><SocialIcon url="http://instagram.com" />Instagram</Footer.Link>
                    <Footer.Link href="http://youtube.com"><SocialIcon url="http://youtube.com" />Youtube</Footer.Link>
                    <Footer.Link href="http://twitter.com"><SocialIcon url="http://twitter.com" />Twitter</Footer.Link>
                </Footer.Column>
            </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}