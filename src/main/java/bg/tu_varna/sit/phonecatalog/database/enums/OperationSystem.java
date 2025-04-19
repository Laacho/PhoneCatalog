package bg.tu_varna.sit.phonecatalog.database.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.HashMap;
import java.util.Map;

public enum OperationSystem {
    IOS("iOS"),ANDROID("Android"),WINDOWS("Windows"),UNKNOWN("Unknown");
    private final String value;
    private static final Map<String, OperationSystem> map = new HashMap<>();
    OperationSystem(String value) {

        this.value = value;
    }
    static {
        for (OperationSystem op : OperationSystem.values()) {
            map.put(op.value, op);
        }
    }
    @JsonValue
    public String toString() {
        return value;
    }

    @JsonCreator
    public static OperationSystem forValue(String value) {
        return map.getOrDefault(value,UNKNOWN);
    }
}
