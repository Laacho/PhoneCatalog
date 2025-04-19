package bg.tu_varna.sit.phonecatalog.database.entities;

import bg.tu_varna.sit.phonecatalog.database.enums.Brand;
import bg.tu_varna.sit.phonecatalog.database.enums.OperationSystem;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "phones")
public class PhoneEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "phone_id", nullable = false, updatable = false)
    private UUID uuid;

    @Enumerated(EnumType.STRING)
    @Column(name = "brand", nullable = false)
    private Brand brand;

    @Column(name = "model", nullable = false)
    private String model;

    @Column(name = "publish_date", nullable = false)
    private LocalDate publishDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "operation_system", nullable = false)
    private OperationSystem operationSystem;

    @Column(name = "version", nullable = false)
    private String version;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private BigDecimal startingPrice;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "phone_specifications",
            joinColumns = @JoinColumn(name = "phone_id"),
            inverseJoinColumns = @JoinColumn(name = "specification_id")
    )
    private List<SpecificationEntity> specifications;


}
