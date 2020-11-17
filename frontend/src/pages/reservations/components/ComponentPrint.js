import React, { Component } from 'react'
import HotelHeader from './HotelHeader'
import OrderTable from './OrderTable'

export default class ReceiptPrint extends Component {
    render() {
        const {orderNo, hotel, roomType, checkIn, checkOut, reservation} = this.props;
        
        return (
            <div>
            <HotelHeader />
            <OrderTable data={this.props}/>
            </div>
        );
    }
}