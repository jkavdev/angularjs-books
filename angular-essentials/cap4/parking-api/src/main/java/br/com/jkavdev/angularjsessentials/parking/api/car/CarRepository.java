package br.com.jkavdev.angularjsessentials.parking.api.car;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {
}
