package example.service;

import io.minio.*;
import io.minio.messages.Item;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.MediaType;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class MinioFileService{

    @Inject
    private MinioClient minioClient;

    public List<String> getAllFile(String bucket) throws Exception{
        if (minioClient == null) {
            throw new IllegalArgumentException("MinioClient cannot be null");
        }

        Iterable<Result<Item>> listObjectsArgs = minioClient.listObjects(ListObjectsArgs.builder()
                .bucket(bucket).build());

        List<String> resultToList = new ArrayList<>();
        listObjectsArgs.forEach(value -> {
            try {
                resultToList.add(value.get().objectName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        return resultToList;
    }

    public Object uploadFile(String bucketName, InputStream filStream, String fileName) throws Exception{
        try{
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .stream(filStream,-1,10485760)
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .build()
            );
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public void deleteFile(String bucket, String fileName) throws Exception{
        try {
            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket)
                            .object(fileName)
                            .build()
            );
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public InputStream downloadFile(String bucket, String fileName) throws Exception{
        InputStream inputStream = minioClient.getObject(bucket,fileName);
        return inputStream;
    }




}