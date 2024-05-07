package example.service.jasper;

import com.fasterxml.jackson.databind.ObjectMapper;
import example.dto.jasper.temp1.ReportDto;
import example.dto.jasper.temp2.AddressJasperRowDto;
import example.dto.jasper.temp3.LetterDto;
import example.service.minio.MinioFileService;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Singleton
public class ReportService{

    private JasperReport compiledReport;
    private String jasperFileName;

    private static final Logger logger = Logger.getLogger(ReportService.class.getName());

    @Inject
    MinioFileService minioFileService;


    public byte[] generatePdfReport(JsonObject jsonObject , String filename, String bucket, String template) throws Exception {
        String resourcePath = "reports.config/";

        if(template.equals("1")){
            jasperFileName = "ExampleReport.jrxml";

            ObjectMapper objectMapper = new ObjectMapper();
            ReportDto dto = objectMapper.readValue(jsonObject.toString(),ReportDto.class);

            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath + jasperFileName);
            if (inputStream != null) {
                compiledReport = JasperCompileManager.compileReport(inputStream);
            } else {
                throw new IllegalStateException("Resource not found: reports.config/" + jasperFileName);
            }

            Map<String, Object> params = new HashMap<>();
            params.put("companyUrl", dto.getCompanyUrl());
            params.put("companyName", dto.getCompanyName());

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dto.getRows());
            try {
                JasperPrint jasperPrint = JasperFillManager.fillReport(compiledReport, params, dataSource);
                byte[] pdfData = JasperExportManager.exportReportToPdf(jasperPrint);

                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(pdfData);

                // Upload PDF to MinIO
//                minioFileService.uploadFile(bucket, byteArrayInputStream, filename);

                return pdfData;
            } catch (JRException e) {
                e.printStackTrace();
                return null;
            }

        } else if(template.equals("2")){
            jasperFileName = "User_Address.jrxml";

            ObjectMapper objectMapper = new ObjectMapper();
            AddressJasperRowDto dto = objectMapper.readValue(jsonObject.toString(),AddressJasperRowDto.class);

            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath + jasperFileName);
            if (inputStream != null) {
                compiledReport = JasperCompileManager.compileReport(inputStream);
            } else {
                throw new IllegalStateException("Resource not found: reports.config/" + jasperFileName);
            }

            Map<String, Object> params = new HashMap<>();
            params.put("firstname", dto.getFirstname());
            params.put("lastname", dto.getLastname());
            params.put("street", dto.getStreet());
            params.put("city", dto.getCity());

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singleton(dto));
            JasperPrint jasperPrint = JasperFillManager.fillReport(compiledReport, params, dataSource);
            byte[] pdfData = JasperExportManager.exportReportToPdf(jasperPrint);

            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(pdfData);

            // Upload PDF to MinIO
//            minioFileService.uploadFile(bucket, byteArrayInputStream, filename);

            return pdfData;

        } else if(template.equals("3")){
            jasperFileName = "Letter.jrxml";

            try {

                InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath + jasperFileName);
                if (inputStream == null) {
                    throw new IllegalStateException("Jasper file not found: " + jasperFileName);
                }

                compiledReport = JasperCompileManager.compileReport(inputStream);

//                LetterDto letterDto = new LetterDto();
                ObjectMapper objectMapper = new ObjectMapper();
                LetterDto letterDto = objectMapper.readValue(jsonObject.toString(),LetterDto.class);

                Map<String, Object> parameters = new HashMap<>();
                parameters.put("senderAddress", letterDto.getSenderAddress());
                parameters.put("date", letterDto.getDate());
                parameters.put("recipientName", letterDto.getRecipientName());
                parameters.put("recipientAddress", letterDto.getRecipientAddress());
                parameters.put("salutation", letterDto.getSalutation());
                parameters.put("content1", letterDto.getContent1());
                parameters.put("content2", letterDto.getContent2());
                parameters.put("content3", letterDto.getContent3());
                parameters.put("closing", letterDto.getClosing());
                parameters.put("signature", letterDto.getSignature());

                JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singleton(letterDto));
                JasperPrint jasperPrint = JasperFillManager.fillReport(compiledReport, parameters, dataSource);
                byte[] pdfData = JasperExportManager.exportReportToPdf(jasperPrint);

                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(pdfData);

//                minioFileService.uploadFile(bucket, byteArrayInputStream, filename);

                return pdfData;

            } catch (Exception e) {
                // Log error
                logger.severe("Failed to generate PDF: " + e.getMessage());
                e.printStackTrace();
                return null;
            }
        }


        return null;
    }


}
