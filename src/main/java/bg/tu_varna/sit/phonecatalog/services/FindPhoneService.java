package bg.tu_varna.sit.phonecatalog.services;

import bg.tu_varna.sit.phonecatalog.api.model.find.FindPhoneInput;
import bg.tu_varna.sit.phonecatalog.api.model.find.FindPhoneOutput;
import bg.tu_varna.sit.phonecatalog.api.model.find.FindPhoneProcess;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.database.repositories.PhoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FindPhoneService implements FindPhoneProcess {
    private final PhoneRepository phoneRepository;

    @Override
    public FindPhoneOutput process(FindPhoneInput model) {
        PhoneEntity phoneEntity = phoneRepository.findById(model.getId())
                .orElseThrow(() -> new RuntimeException("No phone was found"));
        return FindPhoneOutput
                .builder()
                .phone(phoneEntity)
                .build();
    }
}
