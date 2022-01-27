package com.bgmeetup.backend.enums;

public enum InviteStatus {
    Invited(0) ,
    Accepted(1),
    Refused(2),
    NotInvited(3);

    private final int value;
    private InviteStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
