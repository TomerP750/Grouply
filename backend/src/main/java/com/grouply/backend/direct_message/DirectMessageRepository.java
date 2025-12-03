package com.grouply.backend.direct_message;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectMessageRepository extends JpaRepository<DirectMessage, Long> {

    Page<DirectMessage> findByRoomIdOrderBySentAtAsc(Long roomId, Pageable pageable);

}
