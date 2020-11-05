const fs = require('fs');
const hotels = [
    {
        id: 1,
        floors: 10,
        roomPerFloor: 35
    },
    {
        id: 2,
        floors: 9,
        roomPerFloor: 30,
    },
    {
        id: 3,
        floors: 7,
        roomPerFloor: 25,
    },
    {
        id: 4,
        floors: 7,
        roomPerFloor: 25,
    },
];

const roomTypes = ["Luxe", "Standard"];

function getRoomType() {
    let rand = Math.random();
    if(rand <= 0.8) {
        return roomTypes[1];
    } else {
        return roomTypes[0]
    }
}

function format(number) {
    if(number / 10 < 1) {
        return "0" + number;
    }
    return number;
}

let result = ``;

for(let hotel of hotels) {
        for(let i = 1; i <= hotel.floors; i++) {
            for(let j = 1; j <= hotel.roomPerFloor; j++) {
                const sql = `INSERT INTO ROOM(hotelid, roomnumber, \`floor#\`,
                         \`stayingguests#\`, lastcleandate, roomtypehotelid, roomtypename)
                          VALUE (${hotel.id}, '${i}.${format(j)}', ${i}, 0, '2020-11-06', ${hotel.id}, '${getRoomType()}');`;
                result += sql + "\n";
            }
        }
}

fs.writeFile('./fillRooms.sql', result, (res, err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Finished");
    }
});

