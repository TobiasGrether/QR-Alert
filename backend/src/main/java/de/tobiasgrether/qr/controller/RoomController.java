package de.tobiasgrether.qr.controller;

import de.tobiasgrether.qr.QRBackend;
import de.tobiasgrether.qr.object.Room;
import io.javalin.http.Context;

import java.util.Locale;

public class RoomController {

    public static void roomAlert(Context context) {
        String roomName = context.queryParam("room");

        Room room = QRBackend.getInstance().getRoomManager().getRoom(roomName);

        if (room != null) {
            room.setStatus(Room.Status.ALERT);
        } else {
            context.status(404);
            context.html("Room with id " + roomName + " not found");
        }
    }

    public static void createRoom(Context context) {
        String roomName = context.queryParam("name");

        if (roomName.trim().equals("")) return;

        Room existing = QRBackend.getInstance().getRoomManager().getRoom(roomName);

        if (existing == null) {
            Room newRoom = new Room(roomName, Room.Status.NONE);
            QRBackend.getInstance().getRoomManager().addRoom(newRoom);
        } else {
            context.status(500);
            context.html("Room already exists");
        }
    }

    public static void deleteRoom(Context context) {
        String roomName = context.queryParam("name");

        Room existing = QRBackend.getInstance().getRoomManager().getRoom(roomName);

        if (existing != null) {
            QRBackend.getInstance().getRoomManager().deleteRoom(roomName);
        } else {
            context.status(500);
            context.html("Room does not exists");
        }
    }

    public static void setRoomStatus(Context context) {
        String roomName = context.queryParam("room");
        String status = context.queryParam("status");

        Room room = QRBackend.getInstance().getRoomManager().getRoom(roomName);

        if (room != null) {
            room.setStatus(Room.Status.valueOf(status.toUpperCase(Locale.ROOT)));
        } else {
            context.status(404);
            context.html("Room not found");
        }
    }
}
