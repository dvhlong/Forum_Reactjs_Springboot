package com.dvhl.forum_be.service;

// import java.nio.file.Path;
// import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FilesStorageService {
    public void init();
    public void save(MultipartFile file,String newfilename);
    public Resource load(String filename);
    public void delete(String filename);
  }
