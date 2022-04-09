import jsPDF from "jspdf";
import QRCode from "qrcode"

export async function generateList(rooms, baseURL) {
    let pdf = new jsPDF()
    for (const room of rooms){
        let page = pdf.insertPage(1)

        await createPage(room.name, page, baseURL)
    }

    pdf.save("alertCodes.pdf")
}

export async function generateSingle(roomName, baseUrl){
    let pdf = new jsPDF()

    await createPage(roomName, pdf, baseUrl)

    pdf.save(roomName + ".pdf");
}

async function createPage(roomName, pdf, baseURL){
    pdf.text("Room " + roomName, 90, 30)

    const uri = await QRCode.toDataURL(baseURL + "/alert?room=" + roomName)
    pdf.addImage(uri, 'png', 35, 50, 140, 140)
}
