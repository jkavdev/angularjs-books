package br.com.jkavdev.angularjsessentials.parking.api.resources;

import br.com.jkavdev.angularjsessentials.parking.api.car.Car;
import br.com.jkavdev.angularjsessentials.parking.api.car.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarResource implements Base {

    @Autowired
    private CarRepository repository;

    @GetMapping
    public List<Car> getCars() {
        return repository.findAll();
    }

    @PostMapping
    public Car save(@RequestBody @Valid Car car) {
        car.setEntrance(LocalDateTime.now());
        return repository.save(car);
    }

}
