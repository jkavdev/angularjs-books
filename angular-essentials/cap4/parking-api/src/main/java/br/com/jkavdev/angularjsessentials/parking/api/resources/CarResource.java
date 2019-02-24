package br.com.jkavdev.angularjsessentials.parking.api.resources;

import br.com.jkavdev.angularjsessentials.parking.api.car.Car;
import br.com.jkavdev.angularjsessentials.parking.api.car.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("{id}")
    public Car getCar(@PathVariable Integer id) {
        Optional<Car> opt = repository.findById(id);
        opt.orElseThrow(() -> new EmptyResultDataAccessException(1));
        return opt.get();
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCar(@PathVariable Integer id) {
        repository.delete(getCar(id));
    }

}