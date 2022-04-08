package de.tobiasgrether.qr.controller.ws;

import de.tobiasgrether.qr.object.Room;

public class WebsocketMessage {
    private String intent;
    private Object targetRoom;

    public WebsocketMessage(String intent, Object targetRoom) {
        this.intent = intent;
        this.targetRoom = targetRoom;
    }

    public String getIntent() {
        return intent;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    public Object getTargetRoom() {
        return targetRoom;
    }

    public void setTargetRoom(Room targetRoom) {
        this.targetRoom = targetRoom;
    }
}
