import axios from "axios";
import {ALL_RESERVATIONS_SET_RESERVATIONS} from "../../store/manager/allReservations/allReservationsActionTypes";

async function fetchAllReservationsAction(dispatch) {
    try {
        // const {data} = (await axios.get('/api/reservations'));
        dispatch({type: ALL_RESERVATIONS_SET_RESERVATIONS, payload: data});
    } catch (error) {
        throw error;
    }
}

export default fetchAllReservationsAction;

const data = [
  {
    HotelId: "1",
    Email: 'islam@gmail.com',
    FirstName: 'Islam',
    LastName: 'Orazbek',
    hotel: "Rixos Almaty",
    roomType: "Standard", checkInDate: "21-10-2020",
    checkOutDate: "30-10-2020",
    orderDateTime: "20-10-2020",
    status: 'Good',
  },
  {
    HotelId: "2",
    Email: 'watson1@gmail.com',
    FirstName: 'Emma1',
    LastName: 'Watson1',
    hotel: "Rixos Borovoe",
    roomType: "Luxe",
    checkInDate: "21-10-2020",
    checkOutDate: "30-10-2020",
    orderDateTime: "20-10-2020",
    status: 'bad idk',
  }];