package com.san.nhms.data;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.event.Reception;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.inject.Named;

import com.san.nhms.model.Users;

@RequestScoped
public class UserListProducer {
	@Inject
	private UserRepository usersRepository;

	private List<Users> users;

	@Produces
	@Named
	public List<Users> getUsers() {
		return users;
	}

	public void onMemberListChanged(@Observes(notifyObserver = Reception.IF_EXISTS) final Users users) {
		retrieveAllMembersOrderedByName();
	}

	@PostConstruct
	public void retrieveAllMembersOrderedByName() {
		users = usersRepository.findAllOrderedByName();
	}

}
