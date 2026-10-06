package com.techelevator.dao;

import com.techelevator.model.Post;

import java.util.List;

public interface PostDao {
    List<Post> getRandomPosts(int numPostToGet);
    Post getPostById(int id);
    Post createPost(Post post);

}
