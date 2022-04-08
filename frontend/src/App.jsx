import {BrowserRouter, Route, Switch} from "react-router-dom";
import Overview from "./pages/Overview";
import Alert from "./pages/Alert";
import {ChakraProvider, useColorMode} from "@chakra-ui/react";
import {Toaster} from "react-hot-toast";
import Spectator from "./pages/Spectator";
import theme from "./Theme";

function App() {
    return (
        <div className="App">
            <Toaster/>
            <ChakraProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/alert">
                            <Alert/>
                        </Route>
                        <Route path="/spectate">
                            <Spectator/>
                        </Route>
                        <Route path="/">
                            <Overview/>
                        </Route>

                    </Switch>
                </BrowserRouter>
            </ChakraProvider>

        </div>
    )
}

export default App
