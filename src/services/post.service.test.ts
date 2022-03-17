import IPost from "../models/ipost";
import {getParsedDate, getUserList} from "./post.service";

describe("PostService Test", () => {
    test("getParsedDate should format date", () => {
        const result: string = getParsedDate("2022-03-13T03:12:38+00:00");
        const expectedDateString = "March 13, 2022 03:12:38";
        expect(result).toBe(expectedDateString);
    });

    test("getParsedDate should format date", () => {
        const inputData: IPost[] = [{
            id: "post622e02b39badf_c68f93f0",
            from_name: "Isidro Schuett",
            from_id: "user_16",
            message: "message",
            type: "status",
            created_time: "2022-03-11T01:46:11+00:00"
        },
        {
            id: "post622e02b39bae3_0558a239",
            from_name: "Lashanda Small",
            from_id: "user_12",
            message: "message",
            type: "status",
            created_time: "2022-03-10T21:28:23+00:00"
        },
        {
            id: "post622e02b39bae9_e0760001",
            from_name: "Lashanda Small",
            from_id: "user_12",
            message: "message",
            type: "status",
            created_time: "2022-03-10T16:59:28+00:00"
        },
        {
            id: "post622e02b39baed_f0daa031",
            from_name: "Lashanda Small",
            from_id: "user_12",
            message: "message",
            type: "status",
            created_time: "2022-03-10T12:52:34+00:00"
        }];
        const result = getUserList(inputData);
        const expectedResult = [{from_name:"Isidro Schuett", count:1}, {from_name:"Lashanda Small", count:3}];
        expect(result).toMatchObject(expectedResult);
    });
});
