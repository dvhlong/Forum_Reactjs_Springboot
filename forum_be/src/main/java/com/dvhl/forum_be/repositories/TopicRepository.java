package com.dvhl.forum_be.repositories;

import java.util.List;

import com.dvhl.forum_be.model.Topic;
import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepository extends JpaRepository<Topic, Long> {

    Page<Topic> findAllByIsdeleted(Pageable pageable, boolean isDeleted);

    List<Topic> findAllByIsdeletedOrderByTopicnameAsc(boolean isDeleted);

}
