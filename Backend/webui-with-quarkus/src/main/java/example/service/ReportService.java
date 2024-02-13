package example.service;

import example.dto.ReportDto;
import jakarta.annotation.PostConstruct;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.resource.spi.ConfigProperty;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Singleton
public class ReportService{
    private String resourcePath;

    private JasperReport compiledReport;

//    @ConfigProperty(name = "jasper-report.filename")
//    private String filename;

    @Inject
    MinioFileService minioFileService;

    @PostConstruct
    public void init() {
        try {
            String resourcePath = "reports.config/ExampleReport.jrxml";
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(resourcePath);
            if (inputStream != null) {
                compiledReport = JasperCompileManager.compileReport(inputStream);
            } else {
                throw new IllegalStateException("Resource not found: reports.config/ExampleReport.jrxml");
            }
        } catch (JRException e) {
            throw new IllegalStateException("Error compiling Jasper report", e);
        }
    }

    public byte[] generatePdfReport(ReportDto dto ,String filename) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("companyUrl", dto.getCompanyUrl());
        params.put("companyName", dto.getCompanyName());

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dto.getRows());
        try {
            JasperPrint jasperPrint = JasperFillManager.fillReport(compiledReport, params, dataSource);
            byte[] pdfData = JasperExportManager.exportReportToPdf(jasperPrint);

            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(pdfData);

            // Upload PDF to MinIO
            minioFileService.uploadFile("1testbacket", byteArrayInputStream, filename);

            return pdfData;
        } catch (JRException e) {
            // Handle exception
            e.printStackTrace();
            return null;
        }
    }
}
