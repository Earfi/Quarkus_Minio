package example.service.jasper;

import com.fasterxml.jackson.databind.ObjectMapper;
import example.dto.AddressDto;
import example.dto.jasper.temp1.ReportDto;
import example.service.MinioFileService;
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

@Singleton
public class ReportService{

    private JasperReport compiledReport;
    private String jasperFileName;

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
                minioFileService.uploadFile(bucket, byteArrayInputStream, filename);

                return pdfData;
            } catch (JRException e) {
                e.printStackTrace();
                return null;
            }

        } else if(template.equals("2")){
            jasperFileName = "User_Address.jrxml";

            ObjectMapper objectMapper = new ObjectMapper();
            AddressDto dto = objectMapper.readValue(jsonObject.toString(),AddressDto.class);

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
            minioFileService.uploadFile(bucket, byteArrayInputStream, filename);

            return pdfData;

        }

        return null;
    }


}
