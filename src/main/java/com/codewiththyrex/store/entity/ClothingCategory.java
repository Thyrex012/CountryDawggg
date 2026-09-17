package com.codewiththyrex.store.entity;

public enum ClothingCategory {
    // Tops
    TSHIRT("TSH", "T-Shirt"),
    SHIRT("SHT", "Shirt"),
    TANK_TOP("TNK", "Tank Top"),
    SWEATER("SWT", "Sweater"),
    HOODIE("HOD", "Hoodie"),

    // Bottoms
    JEANS("JNS", "Jeans"),
    TROUSERS("TRS", "Trousers"),
    SHORTS("SHR", "Shorts"),
    SKIRT("SKT", "Skirt"),

    // Outerwear
    JACKET("JKT", "Jacket"),
    COAT("COT", "Coat"),
    BLAZER("BLZ", "Blazer"),
    VEST("VST", "Vest"),

    // Dresses & Jumpsuits
    DRESS("DRS", "Dress");

    private final String code;
    private final String displayName;

    ClothingCategory(String code, String displayName) {
        this.code = code;
        this.displayName = displayName;
    }

    public String getCode() { return code; }
    public String getDisplayName() { return displayName; }
}
