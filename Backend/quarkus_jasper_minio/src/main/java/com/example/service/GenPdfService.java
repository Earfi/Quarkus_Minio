package com.example.service;

import com.example.controller.MinioResource;
import com.example.model.Address;
import com.example.repository.AddressRepository;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.service.serviceAll.FileService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@ApplicationScoped
public class GenPdfService {

    @Inject
    AddressRepository repository;

    @Inject
    MinioFileService minioFileService;

    @Transactional
    public void exportJasperReport(OutputStream output) throws JRException {
        List<Address> addresses = repository.listAll();

        try (var inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("User_Address.jrxml")) {
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

            minioFileService.uploadFile("1testbacket", byteArrayInputStream, "TestJasper.pdf");

        } catch (Exception e) {
            throw new JRException("Failed to generate PDF", e);
        }
    }
}
