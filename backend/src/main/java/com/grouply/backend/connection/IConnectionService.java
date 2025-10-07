package com.grouply.backend.connection;

import com.grouply.backend.user.User;

public interface IConnectionService {

    boolean areConnected(Long visitorId, Long visitedId);

}
