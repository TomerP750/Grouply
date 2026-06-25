package com.grouply.backend.features.connection.connection;

import com.grouply.backend.shared.exceptions.UnauthorizedException;

public interface IConnectionService {

    boolean areConnected(Long visitorId, Long visitedId);

    boolean removeConnection(Long userId ,Long removedUserId) throws UnauthorizedException;
}
