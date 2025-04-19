package bg.tu_varna.sit.phonecatalog.api.base;

public interface ModelProcessor<T extends ModelOutput, V extends ModelInput> {
    T process(V model);
}
