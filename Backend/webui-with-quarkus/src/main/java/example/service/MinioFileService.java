package example.service;

import example.dto.FileInfo;
import io.minio.*;
import io.minio.errors.MinioException;
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

    public List<FileInfo> getAllFile(String bucket) throws Exception {
        List<FileInfo> fileReturn = new ArrayList<>();
        Iterable<Result<Item>> listObj = minioClient.listObjects(bucket);
        try {
            for (Result<Item> file : listObj) {
                Item item = file.get();
                fileReturn.add(new FileInfo(item.objectName(),String.valueOf(item.size()),item.lastModified().toString()));
            }
        } catch (MinioException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }


        return fileReturn;
    }


    //    public List<BucketInfo> getAllBucket() {
//        List<BucketInfo> bucketReturn = new ArrayList<>();
//        try {
//            List<Bucket> bucketList = minioClient.listBuckets();
//            for (Bucket bucket : bucketList) {
//                bucketReturn.add(new BucketInfo(bucket.name(), bucket.creationDate().toString()));
//            }
//        } catch (MinioException e) {
//            e.printStackTrace();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return bucketReturn;
//    }

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