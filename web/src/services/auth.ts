
const token = sessionStorage.getItem("@session_token");

const isAuthtenticated = () => {
    if(token != null){
        return true;
    }else{
        return false;
    }
}


export default isAuthtenticated;
