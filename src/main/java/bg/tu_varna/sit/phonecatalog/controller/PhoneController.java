package bg.tu_varna.sit.phonecatalog.controller;

import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.database.repositories.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/phones")
public class PhoneController {
    private final PhoneRepository repository;

    @Autowired
    public PhoneController(PhoneRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<PhoneEntity>> getAllPhones() {
        return ResponseEntity.ok(repository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhoneEntity> getPhoneById(@PathVariable UUID id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
