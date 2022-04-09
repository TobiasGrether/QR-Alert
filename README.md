# QR Alert

QR Alert is an application I built for an event at a high school. <br/>
It allows for the technical team to distribute QR codes in rooms which people can scan in case of technical difficulties in these rooms. When scanned, an alert will notify the technical team with the rooms id.

## How it works
Administrators can use the administrator interface to add and manage rooms. They can then generate a PDF with QR Codes. Every QR code will, when scanned, alert the technical team. 
The technical team can use the spectator screen (`/admin/spectate`) to have a very simple overview of rooms with technical errors. The background will be green if no room has a technical error reported. It will change to red as soon as there is a room with an error. In addition, it shows a list of all rooms that are currently in an error stage.

### Why a QR code
QR code are probably the easiest way for anyone to interact with a system. Nowadays everyone carries a smartphone and every smartphone has a camera. I could not think of a way that makes interaction from users easier.


## Views
There are two pages for administrators and one which is reachabe through QR-Codes:
- `/admin/spectate` - Technical screen which is green when no issues are reported, otherwise it shows the list of affected rooms and a red background.
- `/admin/overview` - Management screen, allows for managing rooms, generating PDFs etc
- `/alert` - URL which is opened by the client

## How to use
Adding rooms is easy. From there, you can use the "Generate PDF" button in the overview page to generate a PDF with all the QR codes in it, ready for printing. 

It's important to note that you have to fill in the Base URL of your frontend in the URL input field next to generate button before generating the PDF.

## Other
### Security
The administrative views are not secured, but can be by using f.e. Cloudflare Access or default web authentication.

### Storage
The data for the rooms is stored in memory and is dumped into an SQLite3 database on shutdown and loaded on startup.

### Technologies
This project is using Javalin.io for the backend and ChakraUI & Vite for the frontend.


