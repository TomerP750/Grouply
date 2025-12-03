package com.grouply.backend.direct_message_room;

import com.grouply.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DirectMessageRoomRepository extends JpaRepository<DirectMessageRoom, Long> {


    Optional<DirectMessageRoom> findBySenderAndRecipient(User sender, User recipient);
    Optional<DirectMessageRoom> findBySenderIdAndRecipientId(Long senderId, Long recipientId);

    List<DirectMessageRoom> findBySenderOrRecipient(User sender, User recipient);
}
