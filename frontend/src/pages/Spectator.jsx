import useWebSocket from "react-use-websocket";
import {BACKEND_URL, WS_SECURITY_PREFIX} from "../Variables";
import {useEffect, useState} from "react";
import {Box, Center, Text} from "@chakra-ui/react";

function Spectator(){
    const [rooms, setRooms] = useState([])
    const {lastMessage} = useWebSocket(WS_SECURITY_PREFIX + '://' + BACKEND_URL + 'websocket', {
        shouldReconnect: (closeEvent) => true
    })

    useEffect(() => {
        if (lastMessage !== null) {
            let data = lastMessage.data
            const json = JSON.parse(data);

            console.log(json)
            switch (json.intent) {
                case "set_all": {
                    let alertRooms = []
                    for(const index in json.targetRoom){
                        let room = json.targetRoom[index]

                        if(room.status === "ALERT"){
                            alertRooms.push(room)
                            console.log("Added room " + room.name)
                        }
                    }

                    setRooms(alertRooms)
                    break;
                }
            }
        }
    }, [lastMessage])

    console.log(rooms)

    return <Box height="1000px" width="100%" backgroundColor={rooms.length === 0 ? "green.400" : "red"}>
        <Center pt="20%">
            {
                rooms.length === 0 ? <Text fontSize="30px">
                    Alles in Ordnung. Keine Technischen Fehler gemeldet.
                </Text> : <Text fontSize="30px">Technische Fehler in den folgenden Räumen:</Text>
            }

        </Center>
        <Center mt="20px">
            {
                rooms.map(function(val){
                    return <Text key={val.name} fontSize="25px"> &bull; {val.name}</Text>
                })
            }
        </Center>
    </Box>
}

export default Spectator