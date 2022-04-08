import {Button, Center, Input} from "@chakra-ui/react";
import {useState} from "react";
import {BACKEND_URL, SECURITY_PREFIX} from "../Variables";
import {toast} from "react-hot-toast";

function CreateRoomComponent(props) {
    let [text, setText] = useState("")
    return <>
        <Input onChange={e => setText(e.target.value)} placeholder="Raum-Name"/>
        <Button onClick={() => createRoom(text)}>Raum erstellen</Button>
    </>
}

function createRoom(name){
    if(name.trim() === "") return
    toast.promise(fetch(SECURITY_PREFIX + "://" + BACKEND_URL + "room?name=" + name, {
        method: "POST",
        mode: "no-cors"
    }), {
        success: "Raum erfolgreich erstellt",
        error: "Ein fehler ist beim erstellen des raumes aufgetreten"
    })
}

export default CreateRoomComponent