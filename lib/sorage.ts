
import { ClientData } from "@/interfaces/Sidebar";

function fetchUserDetails(): ClientData[] | [] {
    try {

        const userDataString = localStorage.getItem("credentials");
        if (userDataString) {
            const userData: ClientData[] = JSON.parse(userDataString);
            return userData;
        } else {
            return [];
        }
    } catch (error) {

        return [];
    }
}

function editUserDetails(username: string, pin: string, crn: string, password: string): void {
    const userData: ClientData[] | null = fetchUserDetails();
    if (!userData) {

        return;
    }

    userData.forEach((user: ClientData, index: number) => {
        if (user.username === username) {
            user.pin = pin;
            user.crn = crn;
            user.password = password;
            userData[index] = user;
            localStorage.setItem("credentials", JSON.stringify(userData));
        }
    });


}


function addDetails(userData: ClientData): void {
    const old_data: ClientData[] = fetchUserDetails();
    old_data.push(userData);
    localStorage.setItem("credentials", JSON.stringify(old_data));
    window.dispatchEvent(new Event("storage"));
}


function deleteAccount(username: string): void {
    const old_data: ClientData[] = fetchUserDetails();
    const new_data = old_data.filter((item: ClientData) => item.username !== username);
    localStorage.setItem("credentials", JSON.stringify(new_data));
    window.dispatchEvent(new Event("storage"));
}


function accountExists(username: string): boolean {
    const old_data: ClientData[] = fetchUserDetails();
    const new_data = old_data.filter((item: ClientData) => item.username === username);
    if (new_data.length > 0) {
        return true;
    }
    return false;
}


export {fetchUserDetails, addDetails, deleteAccount,accountExists,editUserDetails};