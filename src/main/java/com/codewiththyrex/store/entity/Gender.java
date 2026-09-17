package com.codewiththyrex.store.entity;

public enum Gender {
    MEN("MEN"),
    WOMEN("WMN"),
    KIDS("KID"),
    UNISEX("UNI");

    private final String code;
    Gender(String code) { this.code = code; }
    public String getCode() { return code; }
}
