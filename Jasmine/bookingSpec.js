// Theodore Anderson's tutorial used and editted: https://www.youtube.com/watch?v=dFz2h7o0vqs&ab_channel=TheodoreAnderson

// Testing general booking function output
function Booking() {
    this.journey = (origin, destination) => {
        return journey = origin + " to " + destination
    },
    this.person = (name, email) => {
        return "name: " + name + "\n  email: " + email
    },
    this.time = (hrs, mins) => {
        return hrs + ":" + mins
    },
    this.date = (day, month, year) => {
        return day + "/" + month + "/" + year
    }
}

// Make sure the inputs are defined
describe("Maps Functions - Return a Journey, Person, Time, Date", function (){

    // Create new instance of the function everytime its called
        Booking = new Booking()

    // Test for origin and destination input
    it ("should output the Journey", function(){         
        let result = Booking.journey('Cork','Dublin')
        expect(result).toBe('Cork to Dublin')
    })

    // Test for User's details
    it ("should output the Person's details", function(){
        let result = Booking.person('Jason','Jason123@gmail.com')
        expect(result).toBe( "name: " + "Jason" + "\n  email: " + "Jason123@gmail.com")
    })

    // Test for Time
    it ("should output the Time", function(){
        let result = Booking.time(14, 30)
        expect(result).toBe( 14 + ":" + 30)
    })

    // Test for Date
    it ("should output the Date", function(){
        let result = Booking.date(26, 12, 2021)
        expect(result).toBe(26 + "/" + 12 + "/" + 2021)
    })
})
