package bg.tu_varna.sit.phonecatalog.api.model.compare;

import bg.tu_varna.sit.phonecatalog.api.base.ModelInput;
import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class ComparePhonesInput implements ModelInput {
    private UUID firstPhone;
    private UUID secondPhone;
}
