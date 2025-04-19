package bg.tu_varna.sit.phonecatalog.api.model.find;

import bg.tu_varna.sit.phonecatalog.api.base.ModelInput;
import lombok.*;

import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class FindPhoneInput implements ModelInput{
    private UUID id;
}
