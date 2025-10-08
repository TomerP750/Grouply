package com.grouply.backend.connection_request;

import com.grouply.backend.exceptions.UnauthorizedException;

public interface IConnectionRequestService {

    boolean hasPendingRequestFromVisitedUser(Long visitorId, Long visitedId);

    boolean toggleConnectionRequest(Long senderId ,Long recipientId) throws UnauthorizedException;

    void acceptRequest(Long recipientId ,Long senderId) throws UnauthorizedException;

    void declineRequest(Long recipientId, Long senderId) throws UnauthorizedException;
}
