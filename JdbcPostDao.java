package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Post;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
@Component
public class JdbcPostDao implements PostDao{

    private final JdbcTemplate jdbcTemplate;
    private ReplyDao replyDao;

    public JdbcPostDao(JdbcTemplate jdbcTemplate, ReplyDao replyDao) {
        this.jdbcTemplate = jdbcTemplate;
        this.replyDao = replyDao;
    }
    @Override
    public List<Post> getRandomPosts(int numPostToGet) {
        List<Post> retrievedPosts = new ArrayList<>();
        String sql = "SELECT * FROM posts;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while (results.next() && retrievedPosts.size() < numPostToGet) {
                retrievedPosts.add(
                        new Post(
                                results.getInt("post_id"),
                                results.getString("title"),
                                results.getString("author"),
                                results.getString("body")
                        )
                );
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return retrievedPosts;
    }

    @Override
    public Post getPostById(int id) {
        String sql = "SELECT * FROM posts WHERE post_id = ?;";
        Post retrievedPost = new Post();
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, id);
            while (results.next()) {
                retrievedPost.setPostId(results.getInt("post_id"));
                retrievedPost.setTitle(results.getString("title"));
                retrievedPost.setAuthor(results.getString("author"));
                retrievedPost.setBody(results.getString("body"));
                retrievedPost.setReplies(replyDao.getRepliesByPostId(id));
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }

        return retrievedPost;
    }
    @Override
    public Post createPost(Post post) {
        String sql = "INSERT INTO posts (title, body, author) VALUES (?, ?, ?) RETURNING post_id;";
        try {
            int newPostId = jdbcTemplate.queryForObject(sql, int.class,
                    post.getTitle(), post.getBody(), post.getAuthor());
            post.setPostId(newPostId);
            return post;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (Exception e) {
            e.printStackTrace(); // logs exact DB error
            throw new DaoException("Error creating post", e);
        }
    }

}
