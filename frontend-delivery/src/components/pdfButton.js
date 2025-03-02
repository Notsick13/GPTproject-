import { generateDeliveryPDF } from "../api"
import 'bootstrap/dist/css/bootstrap.min.css';

export const PDFButton = ({ id }) => {
    const handleDownload = async () => {
        try {
            const response = await generateDeliveryPDF(id)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'delivery.pdf')
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.error('Error downloading PDF:', error)
        }
    }

    return (
        <button onClick={handleDownload}>Download PDF</button>
    )
}
