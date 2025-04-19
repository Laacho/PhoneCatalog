package bg.tu_varna.sit.phonecatalog.api.model.create;

import bg.tu_varna.sit.phonecatalog.api.base.ModelInput;
import bg.tu_varna.sit.phonecatalog.database.enums.Brand;
import bg.tu_varna.sit.phonecatalog.database.enums.OperationSystem;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
public class CreatePhoneInput implements ModelInput {
    private Brand brand;
    private String model;
    private LocalDate publishDate;
    private OperationSystem operationSystem;
    private String version;
    private String description;
    private BigDecimal startingPrice;
    private String imageUrl;
    private List<PhoneSpecification> specificationList;
}
