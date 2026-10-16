package com.techelevator.model;

public class Profile{
    private int profileId;
    private String nickname;
    private String bio;
    private int userId;

    public int getProfileId(){
        return profileId;
    }
    public String getNickname(){
        return nickname;
    }
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public String getBio(){



        return bio;
    }
    public void setProfileId(int profileId){
        this.profileId = profileId;
    }
    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    public void setBio(String bio){
        this.bio = bio;
    }
}
