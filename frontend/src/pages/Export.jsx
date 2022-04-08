import jsPDF from "jspdf";
import QRCode from "qrcode"

async function createPDF(rooms, baseURL) {
    let pdf = new jsPDF()
    for (const room of rooms){
        let page = pdf.insertPage(1)
        page.text("Raum " + room.name, 90, 30)

        const uri = await QRCode.toDataURL(baseURL + "/alert?room=" + room.name)
        page.addImage(uri, 'png', 35, 50, 140, 140)
    }

    pdf.save("file.pdf")
}

export default createPDF