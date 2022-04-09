import {
    Badge,
    Box,
    Button,
    Center, Input,
    Menu,
    MenuButton, MenuItem, MenuList, Modal, ModalContent, ModalOverlay,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {BACKEND_URL, SECURITY_PREFIX, WS_SECURITY_PREFIX} from "../Variables";
import {useEffect, useState} from "react";
import CreateRoomComponent from "../components/CreateRoomComponent";
import {generateList, generateSingle} from "./Export";
import useWebSocket from "react-use-websocket";
import {toast} from "react-hot-toast";

function sendRoomStatusChange(name, status) {
    if (name === "") return
    toast.promise(fetch(SECURITY_PREFIX + "://" + BACKEND_URL + "room?room=" + name + "&status=" + status, {
        method: 'PATCH',
        body: "{}",
    }).catch(e => console.log(e)), {
        success: "Status changed successfully",
        error: "There was an error while changing the status"
    })
}

function Overview() {
    const [rooms, setRooms] = useState([]);
    const [baseURL, setBaseURL] = useState("")

    const {lastMessage} = useWebSocket(WS_SECURITY_PREFIX + '://' + BACKEND_URL + 'websocket', {
        shouldReconnect: true
    })

    useEffect(() => {
        if (lastMessage !== null) {
            let data = lastMessage.data
            const json = JSON.parse(data);
            switch (json.intent) {
                case "alert": {
                    toast.error(json.targetRoom.name + " has a technical issue!")
                }
                    break;
                case "set_all": {
                    setRooms(json.targetRoom)
                    break;
                }
            }
        }
    }, [lastMessage])
    let [createOpen, setCreateOpen] = useState(false)
    return <>
        <div id="qr_gen"/>
        <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)}>
            <ModalOverlay/>
            <ModalContent>
                <CreateRoomComponent/>
            </ModalContent>
        </Modal>
        <Center>
            <Box width="100%" mt="2%" ml="10%" mr="10%">
                <Button onClick={() => setCreateOpen(true)} float="left" mr="10px">
                    Add Room
                </Button>
                <Button onClick={() => generateList(rooms, baseURL)} float="left" mb="10px" mr="10px">
                    Create PDF
                </Button>
                <Input float="left" width="400px" placeholder="Basis-URL" onChange={e => {
                    setBaseURL(e.target.value)
                }}/>
                <Table>
                    <TableCaption>Overview</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Status</Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rooms.map(function (element, index) {
                            return <Tr key={index}>
                                <Td>
                                    {element.name}
                                </Td>
                                <Td>
                                    <Badge backgroundColor={element.status === "ALERT" ? "red" : "green"}>
                                        {element.status}
                                    </Badge>
                                </Td>
                                <Td align={"right"}>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<HamburgerIcon/>}>Edit</MenuButton>

                                        <MenuList>
                                            <MenuItem onClick={() => {
                                                fetch(SECURITY_PREFIX + "://" + BACKEND_URL + "room?name=" + element.name, {
                                                    method: "DELETE"
                                                })
                                            }
                                            }>Delete Room</MenuItem>

                                            <MenuItem onClick={() => {
                                                generateSingle(element.name, baseURL)
                                            }}>Generate PDF page</MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    let newStatus = element.status === "ALERT" ? "NONE" : "ALERT"
                                                    sendRoomStatusChange(element.name, newStatus)
                                                }}>Toggle Status</MenuItem>
                                        </MenuList>
                                    </Menu>

                                    <Button ml="15px"
                                            onClick={() => sendRoomStatusChange(element.name, "NONE")}>Reset</Button>
                                </Td>
                            </Tr>
                        })}
                    </Tbody>
                </Table>
            </Box>

        </Center>
    </>
}

export default Overview