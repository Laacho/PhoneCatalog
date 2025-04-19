package bg.tu_varna.sit.phonecatalog.controller;

import bg.tu_varna.sit.phonecatalog.api.model.create.CreatePhoneInput;
import bg.tu_varna.sit.phonecatalog.api.model.find.FindPhoneInput;
import bg.tu_varna.sit.phonecatalog.api.model.get.GetAllPhonesInput;
import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import bg.tu_varna.sit.phonecatalog.services.CreatePhoneService;
import bg.tu_varna.sit.phonecatalog.services.FindPhoneService;
import bg.tu_varna.sit.phonecatalog.services.GetAllPhonesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/phones")
public class PhoneController {
    private final GetAllPhonesService getAllPhonesService;
    private final FindPhoneService findPhoneService;
    private final CreatePhoneService createPhoneService;
    @Autowired
    public PhoneController(GetAllPhonesService getAllPhonesService, FindPhoneService findPhoneService, CreatePhoneService createPhoneService) {

        this.getAllPhonesService = getAllPhonesService;
        this.findPhoneService = findPhoneService;
        this.createPhoneService = createPhoneService;
    }

    @GetMapping
//    @Operation(description = "Gets all phones")
    public ResponseEntity<List<PhoneEntity>> getAllPhones() {
        GetAllPhonesInput input = GetAllPhonesInput.builder()
                .build();
        return ResponseEntity.ok(getAllPhonesService.process(input).getPhones());
    }

    @GetMapping("/{id}")
//    @Operation(description = "Finds phone by id")
    public ResponseEntity<PhoneEntity> getPhoneById(@PathVariable UUID id) {
        FindPhoneInput input = FindPhoneInput.builder()
                .id(id)
                .build();
        return ResponseEntity.ok(findPhoneService.process(input).getPhone());
    }

    @PostMapping("/create")
//    @Operation(description = "Creates phones")
    public ResponseEntity<?> createPhone(@RequestBody CreatePhoneInput input) {
        return ResponseEntity.ok(createPhoneService.process(input));
    }

}
