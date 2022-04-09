import {useLocation} from "react-router-dom";
import {useMemo, useState} from "react";
import {Center} from "@chakra-ui/react";
import {BACKEND_URL, SECURITY_PREFIX} from "../Variables";

function Alert(){
    let query = useQuery();
    let [success, setSuccess] = useState(false)


    fetch(SECURITY_PREFIX + "://" + BACKEND_URL + "alert?room=" + query.get("room"), {
        method: "POST",
    }).then(result => {
        setSuccess(result.ok)
    }).catch(error => {
        console.log(error)
    })

    return <Center mt={"10%"}>
        {
            success ? <>Technical issue was reported successfully</> : <>There was a technical error while reporting the issue</>
        }
    </Center>
}

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

export default Alert