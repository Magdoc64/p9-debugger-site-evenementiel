import {getMonth} from "./index";

/**test implementation**/

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const date = "2022-01-01";
            expect (getMonth(new Date(date))).toBe("janvier")

        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const date = "2022-07-08";
            expect (getMonth(new Date(date))).toBe("juillet")
        });
    });
})

