package example.dto;

public class FileInfo {
    private String fileName;
    private String fileSize;
    private String creationDate;
    private String url;


    public FileInfo(String fileName, String fileSize, String creationDate, String url) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.creationDate = creationDate;
        this.url = url;
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
}
