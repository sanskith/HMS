package com.san.nhms.data;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.event.Reception;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.inject.Named;

import com.san.nhms.model.Medicine;

@RequestScoped
public class MedicineListProducer {

	@Inject
	private MedicineRepository medicineRepository;

	private List<Medicine> medicines;

	// @Named provides access the return value via the EL variable name
	// "members" in the UI (e.g.
	// Facelets or JSP view)
	@Produces
	@Named
	public List<Medicine> getMedicines() {
		return medicines;
	}

	public void onMemberListChanged(
			@Observes(notifyObserver = Reception.IF_EXISTS) final Medicine medicine) {
		retrieveAllMembersOrderedByName();
	}

	@PostConstruct
	public void retrieveAllMembersOrderedByName() {
		medicines = medicineRepository.findAllOrderedByName();
	}

}
