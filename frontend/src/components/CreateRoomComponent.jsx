import {Button, Center, Input} from "@chakra-ui/react";
import {useState} from "react";
import {BACKEND_URL, SECURITY_PREFIX} from "../Variables";
import {toast} from "react-hot-toast";

function CreateRoomComponent() {
    let [text, setText] = useState("")
    return <>
        <Input onChange={e => setText(e.target.value)} placeholder="Room name"/>
        <Button onClick={() => createRoom(text)}>Raum erstellen</Button>
    </>
}

function createRoom(name){
    if(name.trim() === "") return
    toast.promise(fetch(SECURITY_PREFIX + "://" + BACKEND_URL + "room?name=" + name, {
        method: "POST",
        mode: "no-cors"
    }), {
        success: "Room created successfully",
        error: "An error was reported while creating that room. Make sure the room does not already exist."
    })
}

export default CreateRoomComponent