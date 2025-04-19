package bg.tu_varna.sit.phonecatalog.services;

import bg.tu_varna.sit.phonecatalog.api.model.get.GetAllPhonesInput;
import bg.tu_varna.sit.phonecatalog.api.model.get.GetAllPhonesOutput;
import bg.tu_varna.sit.phonecatalog.api.model.get.GetAllPhonesProcess;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.database.repositories.PhoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class GetAllPhonesService implements GetAllPhonesProcess {
    private final PhoneRepository phoneRepository;

    @Override
    public GetAllPhonesOutput process(GetAllPhonesInput model) {
        List<PhoneEntity> phoneEntities = phoneRepository.findAll();
        return GetAllPhonesOutput.builder()
                .phones(phoneEntities)
                .build();
    }
}
