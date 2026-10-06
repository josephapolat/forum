package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Reply;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcReplyDao implements ReplyDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcReplyDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Reply getReplyByReplyId(int replyId) {
        String sql = "SELECT * FROM reply WHERE reply_id = ?;";
        Reply retrievedReply = null;

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, replyId);
            if (results.next()) {
                retrievedReply = new Reply(
                        results.getInt("reply_id"),
                        results.getInt("post_id"),
                        results.getString("author"),
                        results.getString("body")
                );
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }

        return retrievedReply;
    }

    @Override
    public List<Reply> getRepliesByPostId(int postId) {
        String sql = "SELECT * FROM reply WHERE post_id = ?;";
        List<Reply> replies = new ArrayList<>();

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, postId);
            while (results.next()) {
                replies.add(new Reply(
                        results.getInt("reply_id"),
                        results.getInt("post_id"),
                        results.getString("author"),
                        results.getString("body")
                ));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }

        return replies;
    }

    @Override
    public Reply createReply(Reply reply) {
        String sql = "INSERT INTO reply (post_id, author, body) VALUES (?, ?, ?) RETURNING reply_id;";

        try {
            int newReplyId = jdbcTemplate.queryForObject(sql, int.class,
                    reply.getPostId(), reply.getAuthor(), reply.getBody());

            reply.setReplyId(newReplyId);
            return reply;

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            throw new DaoException("Error creating reply", e);
        }
    }
}
