package bg.tu_varna.sit.phonecatalog.initializer;

import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.database.entities.SpecificationEntity;
import bg.tu_varna.sit.phonecatalog.database.enums.Brand;
import bg.tu_varna.sit.phonecatalog.database.enums.OperationSystem;
import bg.tu_varna.sit.phonecatalog.database.repositories.PhoneRepository;
import bg.tu_varna.sit.phonecatalog.database.repositories.SpecificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class InitializePhones implements ApplicationRunner {
    private final PhoneRepository phoneRepository;
    private final SpecificationRepository specificationRepository;

    @Autowired
    public InitializePhones(PhoneRepository phoneRepository, SpecificationRepository specificationRepository) {
        this.phoneRepository = phoneRepository;
        this.specificationRepository = specificationRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (phoneRepository.count() == 0) {
            SpecificationEntity spec1 = SpecificationEntity.builder().name("Camera").description("200MP").build();
            SpecificationEntity spec2 = SpecificationEntity.builder().name("Screen").description("6.9\"").build();
            SpecificationEntity spec3 = SpecificationEntity.builder().name("RAM").description("12GB").build();
            SpecificationEntity spec4 = SpecificationEntity.builder().name("CPU").description("Snapdragon 8 Elite").build();
            SpecificationEntity spec5 = SpecificationEntity.builder().name("Battery").description("5000mAh").build();
            SpecificationEntity spec6 = SpecificationEntity.builder().name("Storage").description("256GB").build();
            List<SpecificationEntity> specs = List.of(spec1, spec2, spec3, spec4, spec5, spec6);
            SpecificationEntity spec11 = SpecificationEntity.builder().name("Camera").description("48MP").build();
            SpecificationEntity spec22 = SpecificationEntity.builder().name("Screen").description("6.9\"").build();
            SpecificationEntity spec33 = SpecificationEntity.builder().name("RAM").description("8GB").build();
            SpecificationEntity spec44 = SpecificationEntity.builder().name("CPU").description("A18 Pro").build();
            SpecificationEntity spec55 = SpecificationEntity.builder().name("Battery").description("4685mAh").build();
            SpecificationEntity spec66 = SpecificationEntity.builder().name("Storage").description("256GB").build();
            List<SpecificationEntity> specs2 = List.of(spec11, spec22, spec33, spec44, spec55, spec66);
            specificationRepository.saveAll(specs);
            specificationRepository.saveAll(specs2);
            PhoneEntity phone1 = PhoneEntity.builder()
                    .brand(Brand.SAMSUNG)
                    .model("Galaxy S25 Ultra")
                    .description("All AI features you ever needed")
                    .imageUrl("https://www.wirelessworld.com/wp-content/uploads/2025/01/S25-Ultra-Front_Back-Lockup_Silverblue.png")
                    .operationSystem(OperationSystem.ANDROID)
                    .version("One UI 7.0 (Android 15)")
                    .publishDate(LocalDate.of(2025, 1, 22))
                    .startingPrice(BigDecimal.valueOf(1399L))
                    .specifications(specs)
                    .build();
            PhoneEntity phone2 = PhoneEntity.builder()
                    .brand(Brand.APPLE)
                    .model("16 Pro Max")
                    .description("Introduction to Apple Intelligence")
                    .imageUrl("https://pngimg.com/d/iphone16_PNG38.png")
                    .operationSystem(OperationSystem.IOS)
                    .version("18.4")
                    .publishDate(LocalDate.of(2024, 9, 9))
                    .startingPrice(BigDecimal.valueOf(1199L))
                    .specifications(specs2)
                    .build();
            phoneRepository.save(phone1);
            phoneRepository.save(phone2);

        }
    }
}
