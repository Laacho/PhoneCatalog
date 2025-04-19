package bg.tu_varna.sit.phonecatalog.database.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public enum Brand {
    APPLE("Apple"),SAMSUNG("Samsung"),XIAOMI("XiaoMi"),HUAWEI("Huawei"),LG("LG"),
    HTC("HTC"),UNKNOWN("Unknown");
    private final String value;
    private static final Map<String, Brand> map = new HashMap<>();
    static {
        Arrays.stream(Brand.values())
                .forEach(b -> map.put(b.value, b));
    }

    Brand(String value) {
        this.value = value;
    }

    @JsonValue
    public String toString() {
        return value;
    }

    @JsonCreator
    public static Brand forValue(String value) {
        return map.getOrDefault(value,UNKNOWN);
    }
}
