package bg.tu_varna.sit.phonecatalog.api.model.compare;

import bg.tu_varna.sit.phonecatalog.api.base.ModelOutput;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class ComparePhonesOutput implements ModelOutput {
    private List<PhoneEntity> pair;
}
