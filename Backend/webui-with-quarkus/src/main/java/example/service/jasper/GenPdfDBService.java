package example.service.jasper;

import example.model.Address;
import example.repository.AddressRepository;
import example.service.minio.MinioFileService;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class GenPdfDBService {

    @Inject
    AddressRepository repository;

    @Inject
    MinioFileService minioFileService;

    @Transactional
    public void exportJasperReportAddress(OutputStream output,String bucket) throws JRException {
        List<Address> addresses = repository.listAll();

        try (var inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("reports.config/User_Address.jrxml")) {
            if (inputStream == null) {
                throw new JRException("Jasper report file not found");
            }
            JasperReport jasperReport = JasperCompileManager.compileReport(inputStream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(addresses);

            Map<String, Object> parameters = new HashMap<>();
            parameters.put("createdBy", "Simplifying Tech");

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, byteArrayOutputStream);

            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

//            minioFileService.uploadFile(bucket, byteArrayInputStream, "Customer_Address.pdf");

        } catch (Exception e) {
            throw new JRException("Failed to generate PDF", e);
        }
    }
}
