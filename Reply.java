package com.techelevator.model;

public class Reply {
    public int getReplyId() {
        return replyId;
    }

    public void setReplyId(int replyId) {
        this.replyId = replyId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    private int replyId;
    private int postId;
    private String author;
    private String body;
    public Reply(){}
    public Reply(int replyId, int postId, String author, String body){
        this.replyId = replyId;
        this.postId = postId;
        this.author = author;
        this.body = body;
    }
}
