package bg.tu_varna.sit.phonecatalog.api.model.find;

import bg.tu_varna.sit.phonecatalog.api.base.ModelOutput;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class FindPhoneOutput implements ModelOutput {
    private PhoneEntity phone;
}
