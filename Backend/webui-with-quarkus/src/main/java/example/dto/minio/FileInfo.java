package example.dto.minio;

import java.util.List;
import java.util.Map;

public class FileInfo {
    private String fileName;
    private String fileSize;
    private String creationDate;
    private String url;
    private List<String> tags;

    public FileInfo(String fileName, String fileSize, String creationDate, String url) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.creationDate = creationDate;
        this.url = url;
    }

    public FileInfo(String fileName, String fileSize, String creationDate, String url,List<String> tags) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.creationDate = creationDate;
        this.url = url;
        this.tags = tags;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
