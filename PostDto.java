package com.techelevator.model;

public class PostDto{
    private int postId;
    private String author;
    private String body;

    public int getPostId(){
        return postId;
    }
    public String getAuthor(){
        return author;
    }
    public String getBody(){
        return body;
    }
    public void setPostId(int postId){
        this.postId = postId;
    }
    public void setAuthor(String author){
        this.author = author;
    }
    public void setBody(String body){
        this.body = body;
    }
}
