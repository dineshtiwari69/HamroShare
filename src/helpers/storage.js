


function fetchUserDetails(){

    //Fetch and Parse Json From localstorage
    let userData = JSON.parse(localStorage.getItem("credentials"));
    return userData;

}


function addDetails(userData){
    //Check if key exists
    
    if(!localStorage.hasOwnProperty("credentials")){
        //If not, add key
        localStorage.setItem("credentials", JSON.stringify([userData]));
        window.dispatchEvent(new Event("storage"));
        return
    }

    let old_data = JSON.parse(localStorage.getItem("credentials"));
   
    old_data.push(userData);
    
    localStorage.setItem("credentials", JSON.stringify(old_data));
    window.dispatchEvent(new Event("storage"));
    
}

function deleteAccount(username){
    
    let old_data = JSON.parse(localStorage.getItem("credentials"));
    let new_data = old_data.filter(function(item){
        return item.username !== username;
    }
    );
    localStorage.setItem("credentials", JSON.stringify(new_data));

}

function accountExists(username){
    try{
        let old_data = JSON.parse(localStorage.getItem("credentials"));
        
        let new_data = old_data.filter(function(item){
            return item.username === username;
        });
        if(new_data.length > 0){
            return true;
        }
        return false;
    }
    catch(e){
        console.log(e)
        return false;
    }
    
}

export {fetchUserDetails, addDetails, deleteAccount,accountExists};