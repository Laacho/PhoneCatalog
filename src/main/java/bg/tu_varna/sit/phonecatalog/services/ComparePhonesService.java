package bg.tu_varna.sit.phonecatalog.services;

import bg.tu_varna.sit.phonecatalog.api.model.compare.ComparePhonesInput;
import bg.tu_varna.sit.phonecatalog.api.model.compare.ComparePhonesOutput;
import bg.tu_varna.sit.phonecatalog.api.model.compare.ComparePhonesProcess;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.database.repositories.PhoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ComparePhonesService implements ComparePhonesProcess {
    private final PhoneRepository phoneRepository;

    @Override
    public ComparePhonesOutput process(ComparePhonesInput model) {
        PhoneEntity first = phoneRepository.findById(model.getFirstPhone())
                .orElseThrow(() -> new RuntimeException("First phone not found"));
        PhoneEntity second = phoneRepository.findById(model.getSecondPhone())
                .orElseThrow(() -> new RuntimeException("Second phone not found"));
        return ComparePhonesOutput.builder()
                .pair(List.of(first, second))
                .build();
    }
}
