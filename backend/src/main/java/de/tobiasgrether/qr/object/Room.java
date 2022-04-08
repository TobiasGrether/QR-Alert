package de.tobiasgrether.qr.object;

import de.tobiasgrether.qr.controller.WebSocketController;
import de.tobiasgrether.qr.controller.ws.WebsocketMessage;
import org.jetbrains.annotations.NotNull;

public class Room implements Comparable<Room> {
    private String name;
    private Status status;

    public Room(String name, Status status) {
        this.name = name;
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
        WebSocketController.resend();

        if (status == Status.ALERT) {
            WebSocketController.broadcastChange(new WebsocketMessage("alert", this));
        }

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Room room = (Room) o;

        return name.equals(room.getName());
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

    @Override
    public int compareTo(@NotNull Room o) {
        return this.name.compareTo(o.getName());
    }

    public enum Status {
        NONE,
        ALERT,
    }
}
