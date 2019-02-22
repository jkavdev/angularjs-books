package br.com.jkavdev.angularjsessentials.parking.api.resources;

import br.com.jkavdev.angularjsessentials.parking.api.car.Car;
import br.com.jkavdev.angularjsessentials.parking.api.car.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
