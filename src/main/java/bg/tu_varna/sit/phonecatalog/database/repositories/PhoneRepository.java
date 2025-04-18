package bg.tu_varna.sit.phonecatalog.database.repositories;

import bg.tu_varna.sit.phonecatalog.database.entities.PhoneEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PhoneRepository extends JpaRepository<PhoneEntity, UUID> {
}
