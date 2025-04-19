package bg.tu_varna.sit.phonecatalog.api.model.get;


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
public class GetAllPhonesOutput implements ModelOutput{
    private List<PhoneEntity> phones;
}
