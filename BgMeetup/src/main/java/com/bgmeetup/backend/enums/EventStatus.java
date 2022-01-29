package com.bgmeetup.backend.enums;

public enum EventStatus {
    Pending(0) ,
    Confirmed(1),
    Canceled(2);

    private final int value;
    private EventStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
