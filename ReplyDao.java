package com.techelevator.dao;

import com.techelevator.model.Reply;
import java.util.List;

public interface ReplyDao {

    Reply getReplyByReplyId(int replyId);

    List<Reply> getRepliesByPostId(int postId);


    Reply createReply(Reply reply);
}
