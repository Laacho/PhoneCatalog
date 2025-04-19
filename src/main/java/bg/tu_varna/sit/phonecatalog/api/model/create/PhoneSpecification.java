package bg.tu_varna.sit.phonecatalog.api.model.create;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class PhoneSpecification {
    private String name;
    private String description;
}
