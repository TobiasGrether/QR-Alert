package de.tobiasgrether.qr.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.tobiasgrether.qr.QRBackend;
import de.tobiasgrether.qr.controller.ws.WebsocketMessage;
import io.javalin.websocket.WsContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class WebSocketController {
    public static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger logger = LoggerFactory.getLogger("WebSocketController");
    private static final Set<WsContext> contextMap = new HashSet<>();

    public static void onConnect(WsContext context) {
        contextMap.add(context);

        resend();

        logger.info("New connection received & initialized");
    }

    public static void onClose(WsContext context) {
        contextMap.remove(context);
        logger.info("Websocket disconnected");
    }

    public static void broadcastChange(WebsocketMessage message) {
        contextMap.stream().filter(ctx -> ctx.session.isOpen()).forEach(session -> {
            try {
                session.send(objectMapper.writeValueAsString(message));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        });
    }

    public static void resend() {
        broadcastChange(new WebsocketMessage("set_all", QRBackend.getInstance().getRoomManager().getRooms().stream().sorted().collect(Collectors.toCollection(LinkedHashSet::new))));
    }
}
