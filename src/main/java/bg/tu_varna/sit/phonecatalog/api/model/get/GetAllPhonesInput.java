package bg.tu_varna.sit.phonecatalog.api.model.get;

import bg.tu_varna.sit.phonecatalog.api.base.ModelInput;
import lombok.*;



@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class GetAllPhonesInput implements ModelInput{
}
