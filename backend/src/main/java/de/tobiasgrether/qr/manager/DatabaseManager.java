package de.tobiasgrether.qr.manager;

import de.tobiasgrether.qr.QRBackend;
import de.tobiasgrether.qr.object.Room;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashSet;
import java.util.Set;

public class DatabaseManager {

    private final Logger logger = LoggerFactory.getLogger("Database");
    private Connection connection;

    public void setup() {
        try {
            connection = DriverManager.getConnection("jdbc:sqlite:database.db");
            initializeDatabase();
            logger.info("Database setup successful");
        } catch (Throwable t) {
            logger.error("Error while setting up database", t);
        }


        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            QRBackend.getInstance().getDatabaseManager().pushRooms(QRBackend.getInstance().getRoomManager().getRooms());
            this.close();
        }));
    }

    public void initializeDatabase() {
        try {
            Statement stmt = this.connection.createStatement();
            stmt.executeUpdate("CREATE TABLE IF NOT EXISTS Rooms(name varchar(128) NOT NULL UNIQUE, status smallint)");
            stmt.close();
        } catch (Throwable t) {
            logger.error("Error while initializing database", t);
        }
    }

    public Set<Room> getAllRooms() {
        HashSet<Room> result = new HashSet<>();
        try {
            Statement stmt = this.connection.createStatement();
            ResultSet resultSet = stmt.executeQuery("SELECT * FROM  Rooms");

            while (resultSet.next()) {
                result.add(new Room(resultSet.getString("name"), Room.Status.values()[resultSet.getInt("status")]));
            }
        } catch (Throwable t) {
            logger.error("Error while fetching all rooms to populate local storage", t);
        }

        return result;
    }

    public void pushRooms(Set<Room> rooms) {
        try {
            Statement stmt = this.connection.createStatement();
            for (Room room : rooms) {
                stmt.executeUpdate("INSERT INTO Rooms(name, status) VALUES ('" + room.getName() + "', " + room.getStatus().ordinal() + ") ON CONFLICT(name) DO UPDATE SET name = '" + room.getName() + "', status = " + room.getStatus().ordinal());
            }
            stmt.close();
            logger.info("Data upload completed.");
        } catch (Throwable t) {
            logger.error("Error while uploading data", t);
        }


    }

    public void close() {
        try {
            connection.close();
        } catch (Throwable t) {
            logger.error("Error while stopping database", t);
        }

    }
}
