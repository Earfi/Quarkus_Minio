package example.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.apache.pdfbox.multipdf.PDFMergerUtility;
import org.apache.pdfbox.pdmodel.PDDocument;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@ApplicationScoped
public class PdfMergeService {

    public byte[] mergePdfFiles(List<byte[]> pdfs) {
        PDFMergerUtility merger = new PDFMergerUtility();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            PDDocument resultDocument = new PDDocument();
            for (byte[] pdfBytes : pdfs) {
                try (PDDocument document = PDDocument.load(pdfBytes)) {
                    merger.appendDocument(resultDocument, document);
                }
            }
            resultDocument.save(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
