package de.tobiasgrether.qr;

import de.tobiasgrether.qr.controller.RoomController;
import de.tobiasgrether.qr.controller.WebSocketController;
import de.tobiasgrether.qr.manager.DatabaseManager;
import de.tobiasgrether.qr.manager.RoomManager;
import io.javalin.Javalin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QRBackend {
    private static QRBackend instance;
    private final Logger logger = LoggerFactory.getLogger("Backend");
    private final DatabaseManager databaseManager;
    private final RoomManager roomManager;

    public QRBackend() {
        instance = this;
        logger.info("Starting...");
        Javalin javalin = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
            config.contextPath = "/api";
        });

        javalin.start();

        javalin.post("/alert", RoomController::roomAlert);
        javalin.post("/room", RoomController::createRoom);
        javalin.patch("/room", RoomController::setRoomStatus);
        javalin.delete("/room", RoomController::deleteRoom);
        javalin.ws("/websocket", ws -> {
            ws.onConnect(WebSocketController::onConnect);
            ws.onClose(WebSocketController::onClose);
        });

        databaseManager = new DatabaseManager();
        databaseManager.setup();

        roomManager = new RoomManager(this);
        logger.info("Started application on port " + javalin.port());
    }

    public static QRBackend getInstance() {
        return instance;
    }

    public Logger getLogger() {
        return logger;
    }

    public DatabaseManager getDatabaseManager() {
        return databaseManager;
    }

    public RoomManager getRoomManager() {
        return roomManager;
    }
}
