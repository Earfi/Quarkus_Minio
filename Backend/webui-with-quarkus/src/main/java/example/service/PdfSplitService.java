package example.service;

import jakarta.enterprise.context.ApplicationScoped;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class PdfSplitService {

    public List<byte[]> splitPdf(List<byte[]> pdfDataList) {
        List<byte[]> pages = new ArrayList<>();

        try {
            for (byte[] pdfData : pdfDataList) {
                PDDocument document = PDDocument.load(pdfData);
                int totalPages = document.getNumberOfPages();
                PDFTextStripper textStripper = new PDFTextStripper();

                for (int pageNum = 0; pageNum < totalPages; pageNum++) {
                    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                    PDDocument singlePageDocument = new PDDocument();

                    try {
                        singlePageDocument.addPage(document.getPage(pageNum));
                        singlePageDocument.save(outputStream);
                        pages.add(outputStream.toByteArray());
                    } finally {
                        singlePageDocument.close();
                        outputStream.close();
                    }
                }

                document.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return pages;
    }
}
