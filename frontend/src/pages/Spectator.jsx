import useWebSocket from "react-use-websocket";
import {BACKEND_URL, WS_SECURITY_PREFIX} from "../Variables";
import {useEffect, useState} from "react";
import {Box, Center, Text} from "@chakra-ui/react";

function Spectator() {
    const [rooms, setRooms] = useState([])
    const {lastMessage} = useWebSocket(WS_SECURITY_PREFIX + '://' + BACKEND_URL + 'websocket', {
        shouldReconnect: () => true
    })

    useEffect(() => {
        if (lastMessage !== null) {
            let data = lastMessage.data
            const json = JSON.parse(data);

            switch (json.intent) {
                case "set_all": {
                    let alertRooms = []
                    for (const index in json.targetRoom) {
                        let room = json.targetRoom[index]

                        if (room.status === "ALERT") {
                            alertRooms.push(room)
                        }
                    }

                    setRooms(alertRooms)
                    break;
                }
            }
        }
    }, [lastMessage])

    return <Box height="1000px" width="100%" backgroundColor={rooms.length === 0 ? "green.400" : "red"}>
        <Center pt="20%">
            {
                rooms.length === 0 ? <Text fontSize="30px">
                    No technical errors reported
                </Text> : <Text fontSize="30px">Technical errors in the following rooms:</Text>
            }

        </Center>
        {
            rooms.map(function (val) {
                return <Center mt="20px">
                    <Text key={val.name} fontSize="25px">
                        &bull; {val.name}
                    </Text>
                </Center>
            })
        }
    </Box>
}

export default Spectator