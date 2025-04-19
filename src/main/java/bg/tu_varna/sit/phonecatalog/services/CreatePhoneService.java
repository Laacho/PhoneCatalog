package bg.tu_varna.sit.phonecatalog.services;

import bg.tu_varna.sit.phonecatalog.api.model.create.CreatePhoneInput;
import bg.tu_varna.sit.phonecatalog.api.model.create.CreatePhoneOutput;
import bg.tu_varna.sit.phonecatalog.api.model.create.CreatePhoneProcess;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.database.entities.SpecificationEntity;
import bg.tu_varna.sit.phonecatalog.database.repositories.PhoneRepository;
import bg.tu_varna.sit.phonecatalog.database.repositories.SpecificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CreatePhoneService implements CreatePhoneProcess {
    private final PhoneRepository phoneRepository;
    private final SpecificationRepository specificationRepository;

    @Override
    public CreatePhoneOutput process(CreatePhoneInput model) {
        List<SpecificationEntity> specifications = model.getSpecificationList()
                .stream()
                .map(entity->SpecificationEntity.builder()
                        .name(entity.getName())
                        .description(entity.getDescription())
                        .build())
                .toList();
        specificationRepository.saveAll(specifications);
        PhoneEntity phoneEntity = PhoneEntity.builder()
                .brand(model.getBrand())
                .model(model.getModel())
                .imageUrl(model.getImageUrl())
                .version(model.getVersion())
                .publishDate(model.getPublishDate())
                .operationSystem(model.getOperationSystem())
                .description(model.getDescription())
                .startingPrice(model.getStartingPrice())
                .specifications(specifications)
                .build();
        phoneRepository.save(phoneEntity);
        return CreatePhoneOutput.builder()
                .message("Phone created successfully")
                .build();
    }
}
