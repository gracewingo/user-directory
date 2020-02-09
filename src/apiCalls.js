export const fetchUserData = async () => {
	const response = await fetch('people.json');
	if (response.status >= 400) {
		throw new Error('Error fetching user data');
	} else {
		return await response.json();
	}
};
