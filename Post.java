package com.techelevator.model;

import java.util.List;

public class Post {
    private int postId;
    private String title;
    private String author;
    private String body;

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }

    private List<Reply> replies;

    public Post() {}


    public Post(int postId, String title, String author, String body){
        this.postId = postId;
        this.author = author;
        this.body = body;
        this.title = title;
    }
    public int getPostId() { return postId; }
    public void setPostId(int postId) { this.postId = postId; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
}
