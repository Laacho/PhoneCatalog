package bg.tu_varna.sit.phonecatalog.api.model.create;

import bg.tu_varna.sit.phonecatalog.api.base.ModelOutput;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class CreatePhoneOutput implements ModelOutput {
    private String message;
}
