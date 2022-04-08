package de.tobiasgrether.qr.manager;

import de.tobiasgrether.qr.QRBackend;
import de.tobiasgrether.qr.controller.WebSocketController;
import de.tobiasgrether.qr.object.Room;

import java.util.Set;

public class RoomManager {
    private final Set<Room> rooms;

    public RoomManager(QRBackend backend) {
        this.rooms = backend.getDatabaseManager().getAllRooms();

        backend.getLogger().info("Loaded rooms from database ({})", rooms.size());
        rooms.forEach(room -> backend.getLogger().info("- {}", room.getName()));
    }

    public Room getRoom(String name) {
        for (Room room : rooms) {
            if (room.getName().equalsIgnoreCase(name)) {
                return room;
            }
        }
        return null;
    }

    public void deleteRoom(String name) {
        rooms.removeIf(room -> room.getName().equals(name));

        WebSocketController.resend();
    }

    public void addRoom(Room room) {
        QRBackend.getInstance().getLogger().info("Added room {}", room.getName());
        rooms.add(room);
        WebSocketController.resend();
    }

    public Set<Room> getRooms() {
        return rooms;
    }
}
