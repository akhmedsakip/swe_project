import React, { Component } from 'react'

export default class ReceiptPrint extends Component {
    render() {
        const {orderNo, hotel, roomType, checkIn, checkOut, reservation} = this.props
        return (
            <div>

                <div style={{textAlign:'center',paddingLeft:'30px',fontSize:'30px',color:'green'}}>Digital Receipt</div>
                
                <div style={{display:'flex',padding:'20px 20px 20px 50px '}} >
                    <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Order No:</div><div style={{fontSize:'22px'}}>{orderNo}</div>
                </div>

                <div style={{display:'flex' ,padding:'20px 20px 20px 50px '}}>
                    <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Hotel:</div><div style={{fontSize:'22px'}}>{hotel}</div>
                </div >

                <div style={{display:'flex',padding:'20px 20px 20px 50px '}}>
                    <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Room Type:</div><div style={{fontSize:'22px'}}>{roomType}</div>
                </div>

                <div style={{display:'flex' ,padding:'20px 20px 20px 50px '}}>
                    <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Check In Date:</div><div style={{fontSize:'22px'}}>{checkIn}</div> 
                </div>

                <div style={{display:'flex' ,padding:'20px 20px 20px 50px '}}>
                   <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Check Out Date:</div><div style={{fontSize:'22px'}}>{checkOut}</div> 
                </div>

                <div style={{display:'flex' ,padding:'20px 20px 20px 50px '}}>
                   <div style={{color:'Red',paddingRight:'10px',fontSize:'22px'}}>Reservation Date:</div><div style={{fontSize:'22px'}}>{reservation}</div> 
                </div>

            </div>
        )
    }
}
