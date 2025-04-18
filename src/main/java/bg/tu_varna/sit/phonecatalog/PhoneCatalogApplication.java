package bg.tu_varna.sit.phonecatalog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "bg.tu_varna.sit")
@EnableJpaRepositories(basePackages = "bg.tu_varna.sit.phonecatalog.database.repositories")
@EntityScan(basePackages = "bg.tu_varna.sit.phonecatalog.database.entities")
public class PhoneCatalogApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhoneCatalogApplication.class, args);
    }

}
