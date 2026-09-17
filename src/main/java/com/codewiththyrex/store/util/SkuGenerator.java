package com.codewiththyrex.store.util;

import com.codewiththyrex.store.entity.ClothingCategory;
import com.codewiththyrex.store.entity.Gender;

// Example: SkuGenerator.generate(Gender.WOMEN, ClothingCategory.TSHIRT, 42)
// -> "WMN-TSH-0042"
public class SkuGenerator {
    public static String generate(Gender gender, ClothingCategory category, long sequence) {
        return String.join("-",
                gender.getCode(),
                category.getCode(),
                String.format("%04d", sequence)
        );
    }
}

